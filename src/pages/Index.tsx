import { useState } from 'react';
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

  const defaultGalleryImages = [
    {
      url: 'https://cdn.poehali.dev/projects/2027b953-394c-4273-bb49-d09f3d29ff52/files/734f430c-de5d-4a36-ace0-6549b77e0d1d.jpg',
      title: 'Фасад комплекса'
    },
    {
      url: 'https://cdn.poehali.dev/projects/2027b953-394c-4273-bb49-d09f3d29ff52/files/9474a4a8-ea71-4d98-9acb-cdb59ef20bb8.jpg',
      title: 'Интерьер квартиры'
    },
    {
      url: 'https://cdn.poehali.dev/projects/2027b953-394c-4273-bb49-d09f3d29ff52/files/6ba123e5-20bb-4915-8b89-6831768f5aee.jpg',
      title: 'Вид с высоты'
    }
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
      title: 'Премиальная локация',
      description: 'Центр города с развитой инфраструктурой'
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
          <Button variant="secondary" className="hidden md:block">
            Записаться на просмотр
          </Button>
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
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            WAVE
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Премиальный жилой комплекс нового поколения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Узнать подробнее
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              Связаться с нами
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-white" />
        </div>
      </section>

      <section id="location" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              Локация
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Стратегическое расположение в самом сердце города с отличной транспортной доступностью
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-accent/20"
              >
                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon name={advantage.icon} size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground">
                  {advantage.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">В шаговой доступности</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Метро — 5 минут пешком</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Школы и детские сады — в радиусе 500 метров</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Торговые центры и рестораны — 3 минуты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Парковая зона — прямо у дома</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-64 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Icon name="Map" size={80} className="text-accent/50" />
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
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Посмотрите, как выглядит ваш будущий дом
            </p>
            <div className="flex justify-center">
              <label className="cursor-pointer">
                <Button variant="outline" className="gap-2" asChild>
                  <span>
                    <Icon name="Upload" size={20} />
                    Загрузить свои фото
                  </span>
                </Button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
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
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea placeholder="Расскажите, что вас интересует" rows={4} />
                </div>
                <Button className="w-full" size="lg">
                  Отправить заявку
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
                    <p className="text-muted-foreground">info@wave-complex.ru</p>
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
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
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

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">WAVE</h3>
              <p className="text-primary-foreground/80">
                Премиальный жилой комплекс нового поколения
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Навигация</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Главная
                  </a>
                </li>
                <li>
                  <a href="#location" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Локация
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Галерея
                  </a>
                </li>
                <li>
                  <a href="#contacts" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Контакты</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>+7 (495) 123-45-67</li>
                <li>info@wave-complex.ru</li>
                <li>г. Москва, ул. Примерная, д. 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 WAVE. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;