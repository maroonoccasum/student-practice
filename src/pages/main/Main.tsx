import './Main.css';

import { type FC, useEffect, useRef, useState } from 'react';

import logoImage from './images/logo.png';
import playerImage from './images/player.webp';
import scoreboardImage from './images/scoreboard.jpg';
import teamSpiritImage from './images/team-spirit.webp';

type DateInfo = {
  label: string;
  iso: string;
};

type ModalName = 'login' | 'scoreboard' | null;

export const MainPage: FC = () => {
  const [currentDate, setCurrentDate] = useState<DateInfo>({
    label: '',
    iso: '',
  });
  const [activeModal, setActiveModal] = useState<ModalName>(null);

  const newsSection = useRef<HTMLElement>(null);
  const tournamentsSection = useRef<HTMLElement>(null);
  const teamsSection = useRef<HTMLElement>(null);
  const playersSection = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      setCurrentDate({
        label: now.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        iso: now.toISOString(),
      });
    };

    updateDate();

    const timerId = window.setInterval(updateDate, 60_000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const animatedSections = document.querySelectorAll<HTMLElement>(
      '.reveal-section',
    );

    if (!('IntersectionObserver' in window)) {
      animatedSections.forEach((section) => {
        section.classList.add('is-visible');
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
      },
    );

    animatedSections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (section: HTMLElement | null) => {
    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="main-page">
      <header className="site-header">
        <div className="page-container site-header__content">
          <button
            className="brand"
            type="button"
            onClick={scrollToTop}
            aria-label="Перейти в начало страницы"
          >
            <img className="brand__logo" src={logoImage} alt="" />
            <span className="brand__name">
              АРЕНА <strong>CYBERSPORTS</strong>
            </span>
          </button>

          <nav className="site-navigation" aria-label="Основная навигация">
            <button
              className="site-navigation__link"
              type="button"
              onClick={scrollToTop}
            >
              Главная
            </button>
            <button
              className="site-navigation__link"
              type="button"
              onClick={() => scrollToSection(newsSection.current)}
            >
              Новости
            </button>
            <button
              className="site-navigation__link"
              type="button"
              onClick={() => scrollToSection(tournamentsSection.current)}
            >
              Турниры
            </button>
            <button
              className="site-navigation__link"
              type="button"
              onClick={() => scrollToSection(teamsSection.current)}
            >
              Команды
            </button>
            <button
              className="site-navigation__link"
              type="button"
              onClick={() => scrollToSection(playersSection.current)}
            >
              Игроки
            </button>
          </nav>

          <button
            className="primary-button site-header__login"
            type="button"
            onClick={() => setActiveModal('login')}
          >
            Войти
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="page-container hero-section__layout">
            <div className="hero-section__content">
              <p className="hero-section__eyebrow">
                <span className="live-marker">LIVE</span>
                Центр киберспортивной вселенной
              </p>

              <h1 className="hero-section__title">
                ДОБРО ПОЖАЛОВАТЬ В АРЕНУ{' '}
                <span>CYBERSPORTS</span>
              </h1>

              <p className="hero-section__description">
                Новости, турниры, команды и главные игроки мировой сцены.
                Здесь рождаются легенды.
              </p>

              <time
                className="current-date"
                dateTime={currentDate.iso}
              >
                Сегодня: {currentDate.label}
              </time>

              <div className="hero-section__actions">
                <button
                  className="primary-button primary-button--large"
                  type="button"
                  onClick={() => scrollToSection(newsSection.current)}
                >
                  Читать новости
                </button>

                <button
                  className="secondary-button secondary-button--large"
                  type="button"
                  onClick={() => scrollToSection(tournamentsSection.current)}
                >
                  Результаты турниров
                </button>
              </div>
            </div>

            <div className="hero-visual" aria-label="Киберспортивная арена">
              <div className="hero-visual__glow" />
              <img
                className="hero-visual__logo"
                src={logoImage}
                alt=""
              />
              <div className="hero-visual__photo-frame">
                <img
                  className="hero-visual__photo"
                  src={playerImage}
                  alt="Профессиональный киберспортсмен за игровым компьютером"
                />
              </div>
              <div className="hero-stat hero-stat--left">
                <strong>24/7</strong>
                <span>главные события</span>
              </div>
              <div className="hero-stat hero-stat--right">
                <strong>LIVE</strong>
                <span>матчи и турниры</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="content-section reveal-section"
          ref={newsSection}
        >
          <div className="page-container">
            <p className="section-label">СВЕЖИЕ СОБЫТИЯ</p>
            <h2 className="section-title">Новости мира киберспорта</h2>
            <p className="section-description">
              Следи за результатами команд, трансферами игроков и крупнейшими
              чемпионатами сезона.
            </p>

            <div className="news-grid">
              <article className="news-card">
                <img
                  className="news-card__image"
                  src={teamSpiritImage}
                  alt="Состав киберспортивной команды"
                />
                <div className="news-card__content">
                  <p className="news-card__meta">15 июля 2026 • CS2</p>
                  <h3 className="news-card__title">
                    Команда готовится к главному финалу сезона
                  </h3>
                  <p className="news-card__text">
                    Игроки завершили подготовку и выходят на решающий матч
                    международного турнира.
                  </p>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => scrollToSection(teamsSection.current)}
                  >
                    Подробнее о командах →
                  </button>
                </div>
              </article>

              <article className="news-card">
                <img
                  className="news-card__image"
                  src={playerImage}
                  alt="Игрок во время киберспортивного матча"
                />
                <div className="news-card__content">
                  <p className="news-card__meta">14 июля 2026 • Игроки</p>
                  <h3 className="news-card__title">
                    Звёзды профессиональной сцены обновили рекорды
                  </h3>
                  <p className="news-card__text">
                    Лучшие игроки недели показали высокую точность и уверенную
                    игру в решающих раундах.
                  </p>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => scrollToSection(playersSection.current)}
                  >
                    Открыть профили →
                  </button>
                </div>
              </article>

              <article className="news-card">
                <img
                  className="news-card__image"
                  src={scoreboardImage}
                  alt="Турнирная таблица киберспортивной лиги"
                />
                <div className="news-card__content">
                  <p className="news-card__meta">13 июля 2026 • Турниры</p>
                  <h3 className="news-card__title">
                    Опубликован новый глобальный рейтинг
                  </h3>
                  <p className="news-card__text">
                    Организаторы представили актуальную таблицу лидеров и
                    расписание следующих матчей.
                  </p>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => scrollToSection(tournamentsSection.current)}
                  >
                    Смотреть турниры →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="content-section content-section--accent reveal-section"
          ref={tournamentsSection}
        >
          <div className="page-container">
            <p className="section-label">ГЛАВНАЯ СЦЕНА</p>
            <h2 className="section-title">Турнирная арена</h2>
            <p className="section-description">
              Результаты матчей, положение команд и главная статистика
              чемпионата в одном месте.
            </p>

            <div className="feature-layout">
              <button
                className="feature-image-button"
                type="button"
                onClick={() => setActiveModal('scoreboard')}
                aria-label="Открыть турнирную таблицу крупнее"
              >
                <img
                  className="feature-image"
                  src={scoreboardImage}
                  alt="Таблица глобального рейтинга Pro League"
                />
                <span className="feature-image-button__hint">
                  Нажми, чтобы увеличить
                </span>
              </button>

              <div className="feature-content">
                <article className="info-card">
                  <p className="info-card__label">LIVE MATCH</p>
                  <h3 className="info-card__title">
                    Grand Final: Team Spirit vs NAVI
                  </h3>
                  <p className="info-card__text">
                    Финальная серия до трёх побед: борьба за чемпионский титул и
                    главный приз сезона.
                  </p>
                </article>

                <article className="info-card">
                  <p className="info-card__label">СТАТИСТИКА</p>
                  <h3 className="info-card__title">
                    Таблицы, сетки и расписание
                  </h3>
                  <p className="info-card__text">
                    Быстрый доступ к результатам прошедших матчей и положению
                    команд в турнире.
                  </p>
                </article>

                <div className="statistics-row">
                  <div className="statistic">
                    <strong>16</strong>
                    <span>команд</span>
                  </div>
                  <div className="statistic">
                    <strong>$2M</strong>
                    <span>призовой фонд</span>
                  </div>
                  <div className="statistic">
                    <strong>32</strong>
                    <span>матча</span>
                  </div>
                </div>

                <button
                  className="primary-button primary-button--wide"
                  type="button"
                  onClick={() => setActiveModal('scoreboard')}
                >
                  Открыть турнирную таблицу
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="content-section reveal-section"
          ref={teamsSection}
        >
          <div className="page-container">
            <p className="section-label">СИЛЬНЕЙШИЕ СОСТАВЫ</p>
            <h2 className="section-title">Киберспортивные организации</h2>
            <p className="section-description">
              Изучай составы, историю команд и путь организаций к чемпионским
              кубкам.
            </p>

            <div className="feature-layout feature-layout--reverse">
              <div className="feature-content">
                <article className="info-card">
                  <p className="info-card__label">TEAM PROFILE</p>
                  <h3 className="info-card__title">Team Spirit</h3>
                  <p className="info-card__text">
                    Одна из самых узнаваемых организаций СНГ-сцены. Команда
                    известна дисциплиной и хладнокровием в решающих матчах.
                  </p>
                </article>

                <article className="info-card">
                  <p className="info-card__label">РЕЙТИНГ КОМАНД</p>
                  <h3 className="info-card__title">
                    Форма и последние результаты
                  </h3>
                  <p className="info-card__text">
                    Сравнивай коллективы по винрейту, выступлениям и результатам
                    на крупных турнирах.
                  </p>
                </article>

                <div className="statistics-row">
                  <div className="statistic">
                    <strong>1</strong>
                    <span>место</span>
                  </div>
                  <div className="statistic">
                    <strong>73%</strong>
                    <span>winrate</span>
                  </div>
                  <div className="statistic">
                    <strong>9</strong>
                    <span>трофеев</span>
                  </div>
                </div>
              </div>

              <div className="feature-image-frame">
                <img
                  className="feature-image"
                  src={teamSpiritImage}
                  alt="Состав профессиональной киберспортивной команды"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="content-section content-section--accent reveal-section"
          ref={playersSection}
        >
          <div className="page-container">
            <p className="section-label">ПРОФЕССИОНАЛЬНАЯ СЦЕНА</p>
            <h2 className="section-title">Легенды арены</h2>
            <p className="section-description">
              Профили игроков, лучшие карты, яркие моменты и достижения
              профессионалов.
            </p>

            <div className="feature-layout">
              <div className="feature-image-frame">
                <img
                  className="feature-image"
                  src={playerImage}
                  alt="Киберспортсмен во время профессионального матча"
                />
              </div>

              <div className="feature-content">
                <article className="info-card">
                  <p className="info-card__label">PLAYER PROFILE</p>
                  <h3 className="info-card__title">
                    Звёзды профессиональной сцены
                  </h3>
                  <p className="info-card__text">
                    Узнавай статистику игроков, любимые роли, ключевые
                    достижения и вклад в победы команды.
                  </p>
                </article>

                <div className="statistics-row">
                  <div className="statistic">
                    <strong>87%</strong>
                    <span>winrate</span>
                  </div>
                  <div className="statistic">
                    <strong>24</strong>
                    <span>MVP</span>
                  </div>
                  <div className="statistic">
                    <strong>12</strong>
                    <span>трофеев</span>
                  </div>
                </div>

                <button
                  className="secondary-button secondary-button--wide"
                  type="button"
                  onClick={scrollToTop}
                >
                  Вернуться на главную
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container site-footer__content">
          <div className="site-footer__brand">
            <img src={logoImage} alt="" />
            <span>АРЕНА CYBERSPORTS</span>
          </div>
          <p>
            © 2026 АРЕНА CYBERSPORTS — центр вселенной киберспорта
          </p>
        </div>
      </footer>

      <button
        className="back-to-top"
        type="button"
        onClick={scrollToTop}
        aria-label="Вернуться в начало страницы"
      >
        ↑
      </button>

      {activeModal === 'login' && (
        <div className="modal-backdrop" role="presentation">
          <section
            className="modal-window"
            role="dialog"
            aria-modal="true"
            aria-label="Демонстрационный вход"
          >
            <button
              className="modal-window__close"
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Закрыть окно"
            >
              ×
            </button>
            <img className="modal-window__logo" src={logoImage} alt="" />
            <p className="section-label">АРЕНА CYBERSPORTS</p>
            <h2 className="modal-window__title">Вход в аккаунт</h2>
            <p className="modal-window__text">
              Следите за любимыми командами, игроками и турнирами в одном месте.
            </p>
            <button
              className="primary-button primary-button--wide"
              type="button"
              onClick={() => setActiveModal(null)}
            >
              Продолжить
            </button>
          </section>
        </div>
      )}

      {activeModal === 'scoreboard' && (
        <div className="modal-backdrop modal-backdrop--image" role="presentation">
          <section
            className="scoreboard-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Турнирная таблица"
          >
            <button
              className="modal-window__close"
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Закрыть изображение"
            >
              ×
            </button>
            <img
              src={scoreboardImage}
              alt="Увеличенная турнирная таблица Pro League"
            />
          </section>
        </div>
      )}
    </div>
  );
};
