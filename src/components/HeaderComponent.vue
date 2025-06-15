<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="header__top__contacts">
          <div class="header__top__contacts__item">
            <div class="header__top__contacts__item__icon">
              <img src="@/assets/images/map-hollow.svg" alt="icon" class="header__top__contacts__item__icon__image">
            </div>
            <a href="https://yandex.ru/maps/62/krasnoyarsk/house/televizornaya_ulitsa_1s14/bUsYcQ5hT0ICQFtsfXxzdX1mYA==/" target="_blank" class="header__top__contacts__item__value">г. Красноярск, ул. Телевизорная 1, стр. 14, оф. 204</a>
          </div>
          <div class="header__top__contacts__item">
            <div class="header__top__contacts__item__icon">
              <img src="@/assets/images/phone-call-hollow.svg" alt="icon" class="header__top__contacts__item__icon__image">
            </div>
            <a href="tel:+73912095757" class="header__top__contacts__item__value">+7 (391) 209 57-57</a>
          </div>
          <div class="header__top__contacts__item">
            <div class="header__top__contacts__item__icon">
              <img src="@/assets/images/phone-call-hollow.svg" alt="icon" class="header__top__contacts__item__icon__image">
            </div>
            <a href="tel:+73912155433" class="header__top__contacts__item__value">+7 (391) 215 54-33</a>
          </div>
          <div class="header__top__contacts__item">
            <div class="header__top__contacts__item__icon">
              <img src="@/assets/images/email-hollow.svg" alt="icon" class="header__top__contacts__item__icon__image">
            </div>
            <a href="mailto:los-bio@mail.ru" class="header__top__contacts__item__value">los-bio@mail.ru</a>
          </div>
          <div class="header__top__contacts__item">
            <div class="header__top__contacts__item__icon">
              <img src="@/assets/images/back-arrow-1.svg" alt="icon" class="header__top__contacts__item__icon__image">
            </div>
            <a href="tel:+73912155433" class="header__top__contacts__item__value">Заказать звонок</a>
          </div>
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <div class="container">
        <nav class="header__bottom__nav">
          <div 
            @click="()=>{this.$router.push('/')}"
            class="header__bottom__nav__logo"
          >
            <img src="@/assets/images/logo.svg" alt="logo" class="header__bottom__nav__logo__image">
          </div>
          <div class="header__bottom__nav__list">
            <a href="#" class="header__bottom__nav__list__link  list_option">о компании</a>
            <a href="#" class="header__bottom__nav__list__link  list_option">проекты</a>
            <div class="header__bottom__nav__list__menu  list_option">
              <div class="header__bottom__nav__list__menu__value">каталог</div>
              <div class="header__bottom__nav__list__menu__icon">
                <img src="@/assets/images/down-arrow-fill.svg" alt="icon" class="header__bottom__nav__list__menu__icon__image">
              </div>
            </div>
            <a href="#" class="header__bottom__nav__list__link  list_option">контакты</a>
          </div>
          <button class="header__bottom__nav__button  main-button-style">Получить КП</button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/styles.scss";

  .list_option {
    font-size: 16px;
    font-weight: 400;
    color: $main-text-color;
    &::first-letter {
      text-transform: uppercase;
    }
    &:not(:last-child) {
      margin-right: 56px;
    }
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    &__top {
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      opacity: 0.5;
      &__contacts {
        display: flex;
        justify-content: space-between;
        &__item {
          display: flex;
          align-items: center;
          &__icon {
            max-width: 24px;
            max-height: 24px;
            margin-right: 5px;
            &__image {
              width: 100%;
              height: 100%;
            }
          }
          &__value {
            font-size: 13px;
            font-weight: 400;
            color: $main-text-color;
          }
        }
      }
    }
    &__bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 0px 20px 0px;
      &__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__logo {
          max-width: 240px;
          cursor: pointer;
          &__image {
            width: 100%;
            height: 100%;
          }
        }
        &__list {
          display: flex;
          &__menu {
            display: flex;
            cursor: pointer;
            &__value {
              &::first-letter {
                text-transform: uppercase;
              }
            }
            &__icon {
              max-width: 10px;
              max-height: 10px;
              margin-left: 6px;
              &__image {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        &__button {
          padding: 8px 20px;
          font-size: 14px;
          border-radius: 4px;
        }
      }
    }
  }

@media (max-width: 1200px){
  .header__top {
    height: 35px;
  }
  .header__top__contacts__item__value {
    font-size: 10px;
  }


  
  .header__bottom {
    padding: 15px 0px 17px 0px;
  }
  .header__bottom__nav__logo {
    max-width: 200px;
  }
  .list_option {
    font-size: 15px;
    &:not(:last-child){
      margin-right: 45px;
    }
  }
}
@media (max-width: 991px){
  .header__top {
    height: 30px;
  }
  .header__top__contacts__item__icon {
    max-width: 20px;
    max-height: 20px;
  }
  .header__top__contacts__item__value {
    font-size: 10px;
  }


  
  .header__bottom {
    padding: 10px 0px 13px 0px;
  }
  .header__bottom__nav__logo {
    max-width: 180px;
  }
  .list_option {
    font-size: 14px;
    &:not(:last-child){
      margin-right: 40px;
    }
  }
  .header__bottom__nav__button {
    padding: 6px 16px;
    font-size: 12px;
  }
}
@media (max-width: 768px){
  .header__top {
    height: 50px;
  }
  .header__top__contacts {
    flex-wrap: wrap;
    justify-content: center;
  }
  .header__top__contacts__item {
    margin-right: 20px;
  }
  .header__top__contacts__item__icon {
    max-width: 15px;
    max-height: 15px;
  }
  .header__top__contacts__item__value {
    font-size: 10px;
  }


  
  .header__bottom {
    padding: 7px 0px 10px 0px;
  }
  .header__bottom__nav__logo {
    max-width: 130px;
  }
  .header__bottom__nav__list {
    display: none;
  }
  .header__bottom__nav__button {
    padding: 7px 16px;
    font-size: 14px;
  }
}
@media (max-width: 375px){
  .header__top {
    height: 75px;
  }
  .header__top__contacts {
    flex-wrap: wrap;
    justify-content: center;
  }
  .header__top__contacts__item {
    margin: 4px 20px 4px 0px;
  }
  .header__top__contacts__item__icon {
    max-width: 15px;
    max-height: 15px;
  }
  .header__top__contacts__item__value {
    font-size: 13px;
  }


  
  .header__bottom {
    padding: 7px 0px 10px 0px;
  }
  .header__bottom__nav__logo {
    max-width: 130px;
  }
  .header__bottom__nav__list {
    display: none;
  }
  .header__bottom__nav__button {
    padding: 7px 15px;
    font-size: 12px;
  }
}
</style>