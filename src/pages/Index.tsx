import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [customImages, setCustomImages] = useState<Array<{ url: string; title: string }>>([]);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showLiveCamera, setShowLiveCamera] = useState(false);
  const [activeCamera, setActiveCamera] = useState('panorama');
  const videoRef = useRef<HTMLVideoElement>(null);

  const cameras = [
    { id: 'panorama', name: 'Панорамный вид', url: 'https://stream3.exdesign.ru/borisovskie-5/tracks-v1/mono.m3u8?token=68f12810977b3043cb43ea389ab9e9b785bb0f34-27d630d431b665ea27c325a796fd0bce-1761654917-1761644117' },
    { id: 'camera1', name: 'Камера 1', url: 'https://stream3.exdesign.ru/borisovskie-1/tracks-v1/mono.m3u8?token=5aac7dd812074902af98331b6bb4fac1241e6ee2-a0e33fe8282043f973e81eab1d8b2fae-1761654917-1761644117' },
    { id: 'camera2', name: 'Камера 2', url: 'https://stream3.exdesign.ru/borisovskie-2/tracks-v1/mono.m3u8?token=49025ffead34bee62afd657b1161c4a0b396dcc6-0bdf3bd0af8fda8df64965a2b7be96af-1761654917-1761644117' },
    { id: 'camera3', name: 'Камера 3', url: 'https://stream3.exdesign.ru/borisovskie-3/tracks-v1/mono.m3u8?token=789f0ef3fff16c0dd4e678fda19f924a05ab2de9-e6118fc4766b3df536812238d8473921-1761654917-1761644117' },
    { id: 'camera4', name: 'Камера 4', url: 'https://stream3.exdesign.ru/borisovskie-4/tracks-v1/mono.m3u8?token=a2e359d713f54c2dc128ed4d2ce7892c3554d2b6-cfa2317b1a4a9a6c3eee02a4fe8a5d27-1761654917-1761644117' },
  ];

  useEffect(() => {
    if (showLiveCamera && videoRef.current) {
      const video = videoRef.current;
      const currentCamera = cameras.find(c => c.id === activeCamera);
      
      if (currentCamera) {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = currentCamera.url;
        } else {
          import('hls.js').then(({ default: Hls }) => {
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(currentCamera.url);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
              });
            }
          });
        }
      }
    }
  }, [showLiveCamera, activeCamera]);

  const defaultGalleryImages = [
    { url: 'https://cdn.poehali.dev/files/a7929a00-009f-4cb2-8e4e-17ee876d6139.jpg', title: 'Фасад комплекса' },
    { url: 'https://cdn.poehali.dev/files/d28fef2b-cd4e-4647-9ccf-b306a8f86972.JPG', title: 'Общий вид застройки' },
    { url: 'https://cdn.poehali.dev/files/bfda4ea0-1827-447c-9f92-196d1556c0b4.JPG', title: 'Панорама комплекса' },
    { url: 'https://cdn.poehali.dev/files/a3be7cf1-95bc-499d-b21d-d50660442122.JPG', title: 'Вид с высоты' },
    { url: 'https://cdn.poehali.dev/files/d4897bba-31f1-4193-ae22-c19479bf8c93.JPG', title: 'Башни комплекса' },
    { url: 'https://cdn.poehali.dev/files/7860cbbf-4a84-470d-a7a5-f6cbc2c9d2d4.jpg', title: 'Архитектурный акцент' },
    { url: 'https://cdn.poehali.dev/files/face36c0-1c0e-4403-b692-fc2ea47027cc.jpg', title: 'Детали фасада' },
    { url: 'https://cdn.poehali.dev/files/1f091dfc-3034-45f1-b47c-148d4c489a45.JPG', title: 'Перспектива застройки' },
    { url: 'https://cdn.poehali.dev/files/7e9dffb5-e7bd-436e-b3db-dcc87ce9d929.JPG', title: 'Жилые корпуса' },
    { url: 'https://cdn.poehali.dev/files/aba8b732-3789-4e7b-91f6-7165b5ed7ae9.jpg', title: 'Архитектурная деталь' },
    { url: 'https://cdn.poehali.dev/files/0fcc628f-fb1d-4ff6-b450-ad43b2caba91.jpg', title: 'Закатный вид' },
    { url: 'https://cdn.poehali.dev/files/28e1abe2-262b-46ef-8477-ba5ed32bb3e4.JPG', title: 'Комплекс у реки' },
    { url: 'https://cdn.poehali.dev/files/59bbfe11-146f-4e91-b707-a0238254f531.JPG', title: 'Жилые башни' },
    { url: 'https://cdn.poehali.dev/files/7e652abe-9125-4e52-80db-0c082a918a0f.jpg', title: 'Благоустройство двора' },
    { url: 'https://cdn.poehali.dev/files/ba4dc58d-9ea6-4d5e-9cec-45a3ce412f6e.jpg', title: 'Панорама из парка' },
    { url: 'https://cdn.poehali.dev/files/fcae5bcf-1a07-4856-98e2-3dd5e67577c7.jpg', title: 'Фасадная текстура' },
    { url: 'https://cdn.poehali.dev/files/f586b9a0-81ee-4856-a508-dcab12d91bf0.jpg', title: 'Вечерняя панорама' },
    { url: 'https://cdn.poehali.dev/files/2ecd2ad2-617c-47e1-84d1-f8dd4555d54d.jpg', title: 'Перспективный вид' },
    { url: 'https://cdn.poehali.dev/files/6ac03a7b-bf95-41c2-8f21-a20340963a09.jpg', title: 'Архитектурная композиция' },
    { url: 'https://cdn.poehali.dev/files/6f3b8af8-903e-4290-9b38-3b81de47fc9e.jpg', title: 'Высотные башни' },
    { url: 'https://cdn.poehali.dev/files/2dd09f48-5370-4b0d-be04-8e88c0760404.jpg', title: 'Фасад с кирпичом' },
    { url: 'https://cdn.poehali.dev/files/70a00595-6f15-4598-9853-6f663fdb426d.jpg', title: 'Перспектива с небом' },
    { url: 'https://cdn.poehali.dev/files/107f6857-696c-48df-b939-e68da18707eb.jpg', title: 'Дворовая территория' },
    { url: 'https://cdn.poehali.dev/files/977061f8-fce9-4601-8c24-e8d67aec1956.jpg', title: 'Двор с перголой' },
    { url: 'https://cdn.poehali.dev/files/4ec0438c-f8d9-4441-8c83-8a71cff45cdc.jpg', title: 'Терраса с видом' },
    { url: 'https://cdn.poehali.dev/files/35188e7d-b6b6-4275-8ab8-ef2b01bbee3c.jpg', title: 'Перспектива башен' },
    { url: 'https://cdn.poehali.dev/files/e03819bd-458d-4db3-8c82-95dc7d46736f.jpg', title: 'Фасады у реки' },
    { url: 'https://cdn.poehali.dev/files/98a750a1-a129-435e-adb3-88b67dee5ee6.jpg', title: 'Благоустройство двора' },
    { url: 'https://cdn.poehali.dev/files/b65ea767-bb69-45dc-848b-a43f8445a564.JPG', title: 'Панорамный вид' },
    { url: 'https://cdn.poehali.dev/files/e5188a25-93a2-4039-83e1-0a6c227e763d.JPG', title: 'Вид с высоты птичьего полёта' },
    { url: 'https://cdn.poehali.dev/files/a22d9952-2ac6-4b6f-9b83-df979febd330.JPG', title: 'Застройка у воды' },
    { url: 'https://cdn.poehali.dev/files/ee94652d-43b9-4202-891c-a1ff56236b1d.JPG', title: 'Жилые корпуса' },
    { url: 'https://cdn.poehali.dev/files/3d8cb8d0-8b4a-4199-b703-6e461d94fe8f.JPG', title: 'Вид на локацию' },
    { url: 'https://cdn.poehali.dev/files/34a56d56-dd17-4c42-87d4-6a1e3d6eb552.jpg', title: 'Парковая зона' },
    { url: 'https://cdn.poehali.dev/files/0bbdd67f-dea0-4ca9-9b58-9c8ac372bded.jpg', title: 'Мостик в парке' },
    { url: 'https://cdn.poehali.dev/files/866a96ee-29f9-4fd0-8ccc-09b6328cfe8d.jpg', title: 'Лесная тропа' },
    { url: 'https://cdn.poehali.dev/files/b9fe9cec-17fb-47a3-bc1c-22bd71cb11ee.jpg', title: 'Деревянный мост' },
    { url: 'https://cdn.poehali.dev/files/cc4176ab-90ea-4ca6-812c-7abc28e92b2f.jpg', title: 'Площадка в парке' },
    { url: 'https://cdn.poehali.dev/files/dc46da1b-401c-4877-875d-770d926d4acd.jpg', title: 'Зона отдыха' },
    { url: 'https://cdn.poehali.dev/files/60d8af88-196c-4f48-ab74-b0c82bb2b260.jpg', title: 'Променад в парке' },
    { url: 'https://cdn.poehali.dev/files/f6668e02-d26e-459c-8fa3-1f89a69cc8f5.jpg', title: 'Закатная панорама' },
    { url: 'https://cdn.poehali.dev/files/8be1dc69-d2a4-4736-ac07-71e4b10173ef.jpg', title: 'Вид из парка' },
    { url: 'https://cdn.poehali.dev/files/d96d3b17-581e-46b7-b6f1-c788e377549f.jpg', title: 'Деревянная лестница' },
    { url: 'https://cdn.poehali.dev/files/f4464a2f-bf90-4069-91f6-ec9a8520bbde.jpg', title: 'Променад с солнцем' },
    { url: 'https://cdn.poehali.dev/files/925a6d43-1acb-4358-86a5-a74ecb5945dc.jpg', title: 'Видовая площадка' },
    { url: 'https://cdn.poehali.dev/files/3c3218c6-b451-4293-896b-6cd5137b4d8d.jpg', title: 'Тропа в лесу' },
    { url: 'https://cdn.poehali.dev/files/c8048443-af13-445a-bded-12dada228bc2.jpg', title: 'Садовые качели' },
    { url: 'https://cdn.poehali.dev/files/16e63e30-f062-49cf-9ee9-fcf9d8f337f6.jpg', title: 'Остановка у воды' },
    { url: 'https://cdn.poehali.dev/files/7d335150-42cb-481e-9b49-800809fca2c6.jpg', title: 'Башни в зелени' },
    { url: 'https://cdn.poehali.dev/files/b394e2bb-90e9-4e09-8fc4-2906d6c475f4.jpg', title: 'Променад между деревьями' },
    { url: 'https://cdn.poehali.dev/files/eea9d54f-c506-41d4-8e73-71db19694884.jpg', title: 'Высотки в парке' },
    { url: 'https://cdn.poehali.dev/files/8e47cd44-12cd-4b35-8708-1f6469cdfb37.jpg', title: 'Архитектурная группа' },
    { url: 'https://cdn.poehali.dev/files/d5400cab-4d12-490b-bc3c-d1359d95e585.jpg', title: 'Мостик в парке' },
    { url: 'https://cdn.poehali.dev/files/fd52ddbb-585e-4949-ac26-b88e087073e0.jpg', title: 'Лестница в лес' }
  ];

  const galleryImages = [...defaultGalleryImages, ...customImages];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImages((prev) => [
            ...prev,
            {
              url: event.target.result as string,
              title: file.name.replace(/\.[^/.]+$/, '')
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const advantages = [
    {
      icon: 'MapPin',
      title: 'Расположение',
      description: (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">М</span>
            <span>Борисово</span>
            <Icon name="Bus" size={14} className="ml-1" />
            <span>7мин</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">М</span>
            <span>Москворечье</span>
            <Icon name="PersonStanding" size={14} className="ml-1" />
            <span>12 минут</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">М</span>
            <span>Орехово</span>
            <Icon name="Bus" size={14} className="ml-1" />
            <span>10мин</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">М</span>
            <span>Каширская</span>
            <Icon name="Bus" size={14} className="ml-1" />
            <span>10мин</span>
          </div>
        </div>
      )
    },
    {
      icon: 'Building2',
      title: 'Современная архитектура',
      description: 'Уникальный дизайн от ведущих архитекторов'
    },
    {
      icon: 'Trees',
      title: 'Зелёные зоны',
      description: 'Благоустроенные дворы и парковые зоны'
    },
    {
      icon: 'Car',
      title: 'Паркинг',
      description: 'Подземный паркинг с зарядками для электромобилей'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight">
            WAVE
          </h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Главная
            </a>
            <a href="#apartments" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Квартиры
            </a>
            <a href="#infrastructure" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Инфраструктура
            </a>
            <a href="#advantages" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Преимущества
            </a>
            <a href="#location" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Локация
            </a>
            <a href="#gallery" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Галерея
            </a>
            <a href="#contacts" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
              Контакты
            </a>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              className="hidden md:block text-primary-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-300"
              onClick={() => setShowLiveCamera(true)}
            >
              <Icon name="Video" size={18} className="mr-2" />
              Онлайн-камера
            </Button>
            <Button 
              variant="secondary" 
              className="hidden md:block"
              onClick={() => setShowContactForm(true)}
            >
              Записаться на просмотр
            </Button>
          </div>
        </nav>
      </header>

      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${galleryImages[0].url})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
            WAVE
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-2 font-light uppercase tracking-wider">
            Жилой комплекс бизнес-класса
          </p>
          <p className="text-base md:text-lg text-white/70 mb-8 font-light"></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
              onClick={() => setShowContactForm(true)}
            >
              Записаться на просмотр
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-white bg-white text-primary hover:bg-white/90"
              onClick={() => setShowContactForm(true)}
            >
              Связаться с нами
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-white" />
        </div>
      </section>

      <section id="apartments" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Квартиры
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Выберите свою идеальную квартиру от студии до просторной трёшки
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8">
                    <img 
                      src="https://cdn.poehali.dev/files/053262e3-8081-4dca-be06-b0b19c603363.png"
                      alt="Студия StC-1-11-18"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-primary">Студия StC-1-11-18</h3>
                    <p className="text-muted-foreground mb-4">Площадь: 24.8 м²</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-accent">от 10 638 406 ₽</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Панорамные окна</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Высокие потолки 3м</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Чистовая отделка</span>
                      </li>
                    </ul>
                    <Button className="w-full" onClick={() => setShowContactForm(true)}>
                      Узнать подробнее
                    </Button>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8">
                    <img 
                      src="https://cdn.poehali.dev/files/49ae0d2b-b7ee-4239-9755-4ec9b0aff582.png"
                      alt="1-комнатная евро 1eA-16-3"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-primary">1-комнатная евро 1eA-16-3</h3>
                    <p className="text-muted-foreground mb-4">Площадь: 38.2 м²</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-accent">от 15 623 456 ₽</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Кухня-гостиная</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Балкон с видом</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Гардеробная</span>
                      </li>
                    </ul>
                    <Button className="w-full" onClick={() => setShowContactForm(true)}>
                      Узнать подробнее
                    </Button>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8">
                    <img 
                      src="https://cdn.poehali.dev/files/b9820386-3fe8-4b3c-825a-9696d82b02b1.png"
                      alt="2-комнатная евро 2eA-4-5-14"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-primary">2-комнатная евро 2eA-4-5-14</h3>
                    <p className="text-muted-foreground mb-4">Площадь: 70.5 м²</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-accent">от 26 079 007 ₽</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Раздельные комнаты</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>2 санузла</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Большая кухня 15м²</span>
                      </li>
                    </ul>
                    <Button className="w-full" onClick={() => setShowContactForm(true)}>
                      Узнать подробнее
                    </Button>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8">
                    <img 
                      src="https://cdn.poehali.dev/files/8a65196f-04af-4f71-8cb1-813f0e760c98.png"
                      alt="3-комнатная евро 3eG-1-5-10"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-primary">3-комнатная евро 3eG-1-5-10</h3>
                    <p className="text-muted-foreground mb-4">Площадь: 70.5 м²</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-accent">от 26 795 569 ₽</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Мастер-спальня</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Гардеробные в каждой комнате</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Французский балкон</span>
                      </li>
                    </ul>
                    <Button className="w-full" onClick={() => setShowContactForm(true)}>
                      Узнать подробнее
                    </Button>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8">
                    <img 
                      src="https://cdn.poehali.dev/files/7507931e-240c-4dc1-91fd-1c161b53377b.png"
                      alt="4-комнатная евро 4eB-1-5-10"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-primary">4-комнатная евро 4eB-1-5-10</h3>
                    <p className="text-muted-foreground mb-4">Площадь: 102.4 м²</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-accent">от 39 596 748 ₽</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Просторная планировка</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>3 санузла</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>Несколько балконов</span>
                      </li>
                    </ul>
                    <Button className="w-full" onClick={() => setShowContactForm(true)}>
                      Узнать подробнее
                    </Button>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="mt-12 text-center">
            <Card className="inline-block p-8 bg-gradient-to-r from-accent/10 to-accent/5">
              <h3 className="text-2xl font-bold mb-4 text-primary">Ипотека от 6%</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Специальные условия по ипотеке с господдержкой
              </p>
              <Button size="lg" variant="outline" onClick={() => setShowContactForm(true)}>
                Рассчитать ипотеку
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="infrastructure" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Инфраструктура
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Всё необходимое для комфортной жизни рядом с домом
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img 
                      src="https://cdn.poehali.dev/files/d2e96ae3-2264-4f7a-8acb-ded90a54351c.jpg"
                      alt="Метро Борисово"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Icon name="Train" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Метро Борисово</h3>
                  <p className="text-muted-foreground text-sm">12 минут пешком</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img 
                      src="https://cdn.poehali.dev/files/0b1d25cd-6240-41b6-92e0-8229fc561786.jpg"
                      alt="Детская площадка"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Icon name="Baby" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Детские площадки</h3>
                  <p className="text-muted-foreground text-sm">Современные и безопасные</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img 
                      src="https://cdn.poehali.dev/projects/2027b953-394c-4273-bb49-d09f3d29ff52/files/28de124c-e4a9-4b50-91b8-bdaae11c16d6.jpg"
                      alt="Паркинг"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Icon name="Car" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Паркинг</h3>
                  <p className="text-muted-foreground text-sm">Подземный на 500 мест</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img 
                      src="https://cdn.poehali.dev/projects/2027b953-394c-4273-bb49-d09f3d29ff52/files/7c2c9fe8-c54e-4116-910e-83f7a5775964.jpg"
                      alt="Фитнес"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Icon name="Dumbbell" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Фитнес-центр</h3>
                  <p className="text-muted-foreground text-sm">Тренажерный зал и йога</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/5 aspect-square rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="ShoppingBag" size={80} className="text-accent/40" />
                  </div>
                  <Icon name="ShoppingBag" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Торговые центры</h3>
                  <p className="text-muted-foreground text-sm">3 минуты на авто</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/5 aspect-square rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="GraduationCap" size={80} className="text-accent/40" />
                  </div>
                  <Icon name="GraduationCap" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Школы и сады</h3>
                  <p className="text-muted-foreground text-sm">В радиусе 500м</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/5 aspect-square rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="Heart" size={80} className="text-accent/40" />
                  </div>
                  <Icon name="Heart" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Поликлиника</h3>
                  <p className="text-muted-foreground text-sm">5 минут пешком</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="p-6 text-center h-full">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/5 aspect-square rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="Trees" size={80} className="text-accent/40" />
                  </div>
                  <Icon name="Trees" size={40} className="mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Парковая зона</h3>
                  <p className="text-muted-foreground text-sm">Прямо у дома</p>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section id="advantages" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Преимущества
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Почему стоит выбрать WAVE
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon name="Shield" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Безопасность 24/7</h3>
              <p className="text-muted-foreground">
                Закрытая территория с видеонаблюдением, консьерж-служба и контроль доступа
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon name="Building2" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Надёжный застройщик</h3>
              <p className="text-muted-foreground">
                Опыт строительства более 15 лет, сдано 50+ жилых комплексов
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon name="Sparkles" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Чистовая отделка</h3>
              <p className="text-muted-foreground">
                Качественные материалы, современный дизайн, готово к въезду
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon name="Wind" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Энергоэффективность</h3>
              <p className="text-muted-foreground">
                Современные системы вентиляции, индивидуальное отопление
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon name="Home" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Умный дом</h3>
              <p className="text-muted-foreground">
                Управление освещением, климатом и безопасностью со смартфона
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon name="Calendar" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Срок сдачи</h3>
              <p className="text-muted-foreground">
                IV квартал 2025 года, гарантия соблюдения сроков
              </p>
            </Card>
          </div>

          <Card className="mt-12 p-8 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">О застройщике</h3>
              <p className="text-lg mb-6 text-primary-foreground/90">Компания с 15-летним опытом строительства премиальных жилых комплексов. За это время построено более 50 объектов, в которых живут более 30 000 семей. Все проекты сданы в срок с гарантией качества.</p>
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">15+</div>
                  <div className="text-sm text-primary-foreground/80">лет на рынке</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">50+</div>
                  <div className="text-sm text-primary-foreground/80">построенных объектов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">30К+</div>
                  <div className="text-sm text-primary-foreground/80">довольных семей</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="location" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Локация
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Борисовские пруды — уникальный район с развитой инфраструктурой и природой. Рядом парковая зона, торговые центры и отличная транспортная доступность к центру Москвы
            </p>
          </div>

          <Card className="mb-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                  <span className="text-accent font-bold">Открытие в 2026 году</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-primary">Метро и МЦД</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Одновременно с завершением строительства первой очереди «WAVE» будет открыта станция метро <span className="font-bold text-primary">«Москворечье»</span> новой Бирюлевской линии метро.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-accent mt-1 flex-shrink-0" />
                    <span><strong>1.5 км</strong> — МЦД «Москворечье»</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-accent mt-1 flex-shrink-0" />
                    <span><strong>2.6 км</strong> — ст. м. «Борисово»</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-accent mt-1 flex-shrink-0" />
                    <span><strong>Рядом</strong> — ст. м. «Москворечье» Бирюлевской линии (планов. открытие 2026 г.)</span>
                  </li>
                </ul>
              </div>
              <div className="relative cursor-pointer group" onClick={() => setShowMapModal(true)}>
                <img 
                  src="https://cdn.poehali.dev/files/9673f864-2c23-4c7c-837c-f76bb2b4ad53.jpg" 
                  alt="Карта транспортной доступности WAVE"
                  className="w-full h-auto rounded-lg shadow-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ZoomIn" size={48} className="text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </Card>


        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Галерея
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Посмотрите, как выглядит ваш будущий дом
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div
                      className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-semibold text-white">{image.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <Icon name="X" size={32} />
          </button>
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10 bg-black/50 p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <Icon name="ChevronLeft" size={32} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10 bg-black/50 p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <Icon name="ChevronRight" size={32} />
          </button>

          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <img
              src={galleryImages[selectedImage].url}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-semibold mb-2">{galleryImages[selectedImage].title}</h3>
              <p className="text-white/70">{selectedImage + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Контакты
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Свяжитесь с нами для получения консультации
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Свяжитесь с нами</h3>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                
                try {
                  const response = await fetch('https://functions.poehali.dev/957d5b1a-6bea-4f8f-9368-00a5fb42991a', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                  });
                  
                  if (response.ok) {
                    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                    setFormData({ name: '', phone: '', message: '' });
                    setShowContactForm(false);
                  } else {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    alert(`Ошибка: ${errorData.error || 'Попробуйте позже'}`);
                  }
                } catch (error) {
                  console.error('Fetch error:', error);
                  alert(`Ошибка при отправке: ${error}`);
                } finally {
                  setIsSubmitting(false);
                }
              }}>
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input 
                    placeholder="Ваше имя" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input 
                    placeholder="+7 (___) ___-__-__" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение (необязательно)</label>
                  <Textarea 
                    placeholder="Если есть вопросы, напишите здесь" 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="Phone" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="Mail" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Email</h4>
                    <p className="text-muted-foreground">jkwave@wave.ru</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="MapPin" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Борисовские пруды, д. 1</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Режим работы</h4>
                    <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {showMapModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowMapModal(false)}
        >
          <div className="relative max-w-7xl w-full">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
              onClick={() => setShowMapModal(false)}
            >
              <Icon name="X" size={32} />
            </button>
            <img 
              src="https://cdn.poehali.dev/files/9673f864-2c23-4c7c-837c-f76bb2b4ad53.jpg" 
              alt="Карта транспортной доступности WAVE"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-sm">Нажмите вне изображения, чтобы закрыть</p>
          </div>
        </div>
      )}

      {showLiveCamera && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLiveCamera(false)}
        >
          <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-white">Онлайн-трансляция</h3>
                </div>
                <button 
                  className="text-white hover:text-cyan-400 transition-colors bg-white/10 rounded-full p-2 hover:bg-white/20"
                  onClick={() => setShowLiveCamera(false)}
                >
                  <Icon name="X" size={28} />
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full p-2">
                {cameras.map(camera => (
                  <button
                    key={camera.id}
                    onClick={() => setActiveCamera(camera.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeCamera === camera.id
                        ? 'bg-cyan-400 text-blue-900 shadow-lg'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {camera.name}
                  </button>
                ))}
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-white/70 text-center mt-4 text-sm">
                ЖК ВЕЙВ, Панорамный вид • +8°, Пасмурно
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-primary text-primary-foreground px-4 py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">WAVE</h3>
              <p className="text-primary-foreground/80">
                Премиальный жилой комплекс нового поколения
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent"></h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-primary-foreground/80 hover:text-accent transition-colors"></a>
                </li>
                <li>
                  <a href="#location" className="text-primary-foreground/80 hover:text-accent transition-colors"></a>
                </li>
                <li>
                  <a href="#gallery" className="text-primary-foreground/80 hover:text-accent transition-colors"></a>
                </li>
                <li>
                  <a href="#contacts" className="text-primary-foreground/80 hover:text-accent transition-colors"></a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent"></h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 WAVE. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {showContactForm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactForm(false)}
        >
          <Card 
            className="max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Оставить заявку</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              
              try {
                const response = await fetch('https://functions.poehali.dev/957d5b1a-6bea-4f8f-9368-00a5fb42991a', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                  alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                  setFormData({ name: '', phone: '', message: '' });
                  setShowContactForm(false);
                } else {
                  alert('Ошибка при отправке. Попробуйте позже.');
                }
              } catch (error) {
                alert('Ошибка при отправке. Попробуйте позже.');
              } finally {
                setIsSubmitting(false);
              }
            }}>
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input 
                  placeholder="Ваше имя" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input 
                  placeholder="+7 (___) ___-__-__" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение (необязательно)</label>
                <Textarea 
                  placeholder="Если есть вопросы, напишите здесь" 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;