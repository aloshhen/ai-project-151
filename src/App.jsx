import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Trophy, Target, Heart, Gift, Music, Zap, Users, Menu, X, ChevronRight, Play, Award, Shield } from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const [timeLeft, setTimeLeft] = useState(30)
  const [memoryCards, setMemoryCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  const aboutRef = useRef(null)
  const isAboutInView = useInView(aboutRef, { once: true })
  const gamesRef = useRef(null)
  const isGamesInView = useInView(gamesRef, { once: true })

  // Catch Pupa Game Logic
  const startCatchGame = () => {
    setGameActive(true)
    setGameScore(0)
    setTimeLeft(30)
  }

  const catchPupa = () => {
    if (gameActive) {
      setGameScore(prev => prev + 1)
      setTargetPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10
      })
    }
  }

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameActive(false)
    }
  }, [gameActive, timeLeft])

  // Memory Game Logic
  const initMemoryGame = () => {
    const icons = [Star, Heart, Trophy, Gift, Music, Zap, Target, Shield]
    const cards = [...icons, ...icons].sort(() => Math.random() - 0.5).map((icon, index) => ({
      id: index,
      icon: icon,
      matched: false
    }))
    setMemoryCards(cards)
    setFlippedCards([])
    setMatchedCards([])
  }

  const flipCard = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) return
    
    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      const firstCard = memoryCards.find(c => c.id === first)
      const secondCard = memoryCards.find(c => c.id === second)

      if (firstCard.icon === secondCard.icon) {
        setMatchedCards([...matchedCards, first, second])
        setFlippedCards([])
      } else {
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex gap-1">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-black text-xl cartoon-shadow">
                П
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl cartoon-shadow">
                Л
              </div>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              ПУПА & ЛУПА
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-pink-500 font-bold transition-colors">
              О нас
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-purple-500 font-bold transition-colors">
              Галерея
            </button>
            <button onClick={() => scrollToSection('games')} className="text-gray-700 hover:text-blue-500 font-bold transition-colors">
              Игры
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-500 font-bold transition-colors">
              Контакты
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-gradient-to-r from-pink-500 to-blue-500 text-white p-2 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-pink-200 py-4"
          >
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-pink-500 font-bold">О нас</button>
              <button onClick={() => scrollToSection('gallery')} className="text-left text-gray-700 hover:text-purple-500 font-bold">Галерея</button>
              <button onClick={() => scrollToSection('games')} className="text-left text-gray-700 hover:text-blue-500 font-bold">Игры</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-green-500 font-bold">Контакты</button>
            </div>
          </motion.div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 via-purple-200/50 to-blue-200/50" />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto text-center"
        >
          <div className="flex justify-center gap-8 mb-8">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-black text-5xl cartoon-shadow"
            >
              🎀
            </motion.div>
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-5xl cartoon-shadow"
            >
              🎮
            </motion.div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-shadow">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ПУПА И ЛУПА
            </span>
          </h1>
          <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-8 text-shadow">
            Самые весёлые персонажи интернета! 🎉
          </p>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Добро пожаловать в удивительный мир Пупы и Лупы! Здесь вас ждут невероятные приключения, смешные мемы и захватывающие мини-игры для взрослых, которые не потеряли чувство юмора!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('games')}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-10 py-5 rounded-full text-xl font-black transition-all transform hover:scale-110 cartoon-shadow flex items-center justify-center gap-2"
            >
              Играть сейчас
              <Play className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-full text-xl font-black transition-all transform hover:scale-110 cartoon-shadow"
            >
              Смотреть мемы
            </button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 30 }}
            className="text-5xl md:text-6xl font-black text-center mb-16"
          >
            Познакомьтесь с <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">героями!</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isAboutInView ? 1 : 0, x: isAboutInView ? 0 : -50 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-3xl cartoon-shadow hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-5xl">
                  🎀
                </div>
                <h3 className="text-4xl font-black text-pink-600">ПУПА</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Пупа - это воплощение позитива и безудержного веселья! Она обожает розовый цвет, блёстки и всё, что связано с праздниками. Её жизненное кредо: "Если можно сделать ярче - сделай ещё ярче!"
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-pink-200 text-pink-700 px-4 py-2 rounded-full font-bold text-sm">Оптимистка</span>
                <span className="bg-pink-200 text-pink-700 px-4 py-2 rounded-full font-bold text-sm">Любит танцы</span>
                <span className="bg-pink-200 text-pink-700 px-4 py-2 rounded-full font-bold text-sm">Обожает мемы</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isAboutInView ? 1 : 0, x: isAboutInView ? 0 : 50 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl cartoon-shadow hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-5xl">
                  🎮
                </div>
                <h3 className="text-4xl font-black text-blue-600">ЛУПА</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Лупа - настоящий геймер и эксперт по всем видам развлечений! Он может часами рассказывать о последних трендах и создавать самые смешные шутки. Его девиз: "Жизнь слишком коротка, чтобы быть серьёзным!"
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">Геймер</span>
                <span className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">Юморист</span>
                <span className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">Креативщик</span>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Star, title: 'Миллионы фанатов', desc: 'По всему миру', color: 'yellow' },
              { icon: Trophy, title: 'Лучшие мемы', desc: 'Года 2024', color: 'orange' },
              { icon: Heart, title: 'Любовь аудитории', desc: '99.9% позитива', color: 'red' },
              { icon: Zap, title: 'Новый контент', desc: 'Каждый день', color: 'purple' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 30 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border-4 border-purple-200 hover:border-purple-400 transition-all text-center"
              >
                <div className={`bg-${item.color}-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h4 className="text-xl font-black text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 font-semibold">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-6 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Галерея Мемов 🎨
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '😂', title: 'Когда Пупа нашла скидки', bg: 'from-pink-300 to-pink-400' },
              { emoji: '🎮', title: 'Лупа прошёл игру на 100%', bg: 'from-blue-300 to-blue-400' },
              { emoji: '🍕', title: 'Пятничный вечер', bg: 'from-yellow-300 to-orange-400' },
              { emoji: '💃', title: 'Пупа на дискотеке', bg: 'from-purple-300 to-pink-400' },
              { emoji: '🏆', title: 'Лупа - чемпион мемов', bg: 'from-green-300 to-blue-400' },
              { emoji: '☕', title: 'Понедельник утром', bg: 'from-amber-300 to-brown-400' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`bg-gradient-to-br ${item.bg} p-8 rounded-3xl cartoon-shadow cursor-pointer`}
              >
                <div className="text-8xl text-center mb-4">{item.emoji}</div>
                <h3 className="text-2xl font-black text-white text-center text-shadow">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GAMES */}
      <section id="games" ref={gamesRef} className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isGamesInView ? 1 : 0, y: isGamesInView ? 0 : 30 }}
            className="text-5xl md:text-6xl font-black text-center mb-16"
          >
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Мини-Игры 🎮
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Catch Pupa Game */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isGamesInView ? 1 : 0, y: isGamesInView ? 0 : 30 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-3xl cartoon-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12 text-pink-600" />
                <h3 className="text-3xl font-black text-pink-600">Поймай Пупу!</h3>
              </div>
              <p className="text-gray-700 mb-6 font-semibold">
                Успей кликнуть на Пупу как можно больше раз за 30 секунд! Проверь свою реакцию!
              </p>
              
              {!gameActive ? (
                <div className="text-center">
                  <button 
                    onClick={startCatchGame}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-4 rounded-full text-xl font-black transition-all transform hover:scale-110 cartoon-shadow"
                  >
                    Начать игру!
                  </button>
                  {gameScore > 0 && (
                    <p className="mt-4 text-2xl font-black text-pink-600">
                      Последний результат: {gameScore} очков! 🎉
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-2xl font-black text-pink-600">Счёт: {gameScore}</span>
                    <span className="text-2xl font-black text-blue-600">Время: {timeLeft}с</span>
                  </div>
                  <div className="relative bg-white rounded-2xl h-64 border-4 border-pink-300 overflow-hidden">
                    <motion.button
                      onClick={catchPupa}
                      animate={{ 
                        left: `${targetPosition.x}%`, 
                        top: `${targetPosition.y}%` 
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-16 h-16 text-4xl -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                    >
                      🎀
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Memory Game */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isGamesInView ? 1 : 0, y: isGamesInView ? 0 : 30 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl cartoon-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <Award className="w-12 h-12 text-blue-600" />
                <h3 className="text-3xl font-black text-blue-600">Мемори-Лупа</h3>
              </div>
              <p className="text-gray-700 mb-6 font-semibold">
                Найди все пары карточек! Тренируй память вместе с Лупой!
              </p>
              
              {memoryCards.length === 0 ? (
                <div className="text-center">
                  <button 
                    onClick={initMemoryGame}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-xl font-black transition-all transform hover:scale-110 cartoon-shadow"
                  >
                    Начать игру!
                  </button>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {memoryCards.map((card) => {
                      const CardIcon = card.icon
                      const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id)
                      return (
                        <motion.button
                          key={card.id}
                          onClick={() => flipCard(card.id)}
                          whileHover={{ scale: 1.05 }}
                          className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                            isFlipped 
                              ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white' 
                              : 'bg-white border-4 border-blue-300'
                          } ${matchedCards.includes(card.id) ? 'opacity-50' : ''}`}
                        >
                          {isFlipped ? <CardIcon className="w-8 h-8" /> : '?'}
                        </motion.button>
                      )
                    })}
                  </div>
                  {matchedCards.length === memoryCards.length && (
                    <div className="text-center">
                      <p className="text-2xl font-black text-blue-600 mb-4">🎉 Победа! Все пары найдены!</p>
                      <button 
                        onClick={initMemoryGame}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-black"
                      >
                        Играть ещё раз
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 text-shadow">
            Присоединяйся к нам! 🎉
          </h2>
          <p className="text-2xl text-white mb-8 max-w-2xl mx-auto font-bold">
            Стань частью самого весёлого сообщества в интернете! Новые мемы, игры и приключения каждый день!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-purple-600 px-10 py-5 rounded-full text-xl font-black transition-all transform hover:scale-110 cartoon-shadow flex items-center justify-center gap-2">
              Подписаться
              <ChevronRight className="w-6 h-6" />
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-10 py-5 rounded-full text-xl font-black transition-all transform hover:scale-110 cartoon-shadow">
              Скачать стикеры
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="flex gap-1">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-black cartoon-shadow">
                  П
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black cartoon-shadow">
                  Л
                </div>
              </div>
              <span className="text-2xl font-black text-white">ПУПА & ЛУПА</span>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <Youtube className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8">
            <p className="mb-2">© 2024 Пупа и Лупа. Все права защищены. Создано с любовью и юмором! ❤️</p>
            <p className="text-xs">Сайт создан для развлечения взрослой аудитории. 18+</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App