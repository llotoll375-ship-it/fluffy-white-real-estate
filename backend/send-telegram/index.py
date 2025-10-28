import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет заявки с сайта в Telegram группу
    Args: event - dict с httpMethod, body (JSON с name, phone, message)
          context - объект с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    bot_token = '7949912355:AAFHvmoW9bq0J2_xdWnk7BgYW1jAcFtbAKM'
    chat_id = '-1003267486830'
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram credentials not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
    except Exception:
        body_data = {}
    
    print(f'Received body: {event.get("body")}')
    print(f'Parsed data: {body_data}')
    
    recaptcha_token = body_data.get('recaptchaToken')
    if not recaptcha_token or recaptcha_token != 'simple-captcha-passed':
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Captcha validation required'}),
            'isBase64Encoded': False
        }
    
    name = body_data.get('name', 'Не указано')
    phone = body_data.get('phone', 'Не указан')
    message = body_data.get('message', '')
    
    print(f'Chat ID: {chat_id}')
    print(f'Bot token length: {len(bot_token)}')
    
    telegram_message = f"""🏢 Новая заявка с сайта WAVE

👤 Имя: {name}
📞 Телефон: {phone}"""
    
    if message:
        telegram_message += f"\n\n💬 Сообщение:\n{message}"
    
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': telegram_message
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data)
    
    try:
        with urllib.request.urlopen(req) as response:
            response_data = response.read()
            result = json.loads(response_data.decode('utf-8'))
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'telegram_response': result}),
            'isBase64Encoded': False
        }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Telegram API Error: {e.code}', 'details': error_body}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }