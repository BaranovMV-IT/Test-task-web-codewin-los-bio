<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__content__info">
          <div 
            @click="()=>{this.$router.push('/')}" 
            class="footer__content__info__logo"
          >
            <img src="@/assets/images/logo.svg" alt="logo" class="footer__content__info__logo__image">
          </div>
          <div class="footer__content__info__name">ООО «ТОРГОВЫЙ ДОМ «ЛОС-БИО»</div>
          <div class="footer__content__info__requisites">
              <span class="footer__content__info__requisites__name">ИНН:</span>
              <span class="requisites_option">2463123719</span>
              <span class="footer__content__info__requisites__name">КПП:</span>
              <span class="requisites_option">246301001</span>
              <span class="footer__content__info__requisites__name">ОГРН:</span>
              <span class="requisites_option">1212400008688</span>
          </div>
        </div>
        <div class="footer__content__list">
          <div class="footer__content__list__title">компания</div>
          <a href="#" class="footer__content__list__option  list_option">о компании</a>
          <a href="#" class="footer__content__list__option  list_option">проекты</a>
          <a href="#" class="footer__content__list__option  list_option">каталог</a>
          <a href="#" class="footer__content__list__option  list_option">контакты</a>
        </div>
        <div class="footer__content__list">
          <div class="footer__content__list__title">каталог</div>
          <a href="#" class="footer__content__list__option  list_option">КНС</a>
          <a href="#" class="footer__content__list__option  list_option">ёмкости</a>
          <a href="#" class="footer__content__list__option  list_option">ливневые очистные-сооружения</a>
          <a href="#" class="footer__content__list__option  list_option">хозяйственно-бытовые очистные сооружения</a>
          <a href="#" class="footer__content__list__option  list_option">комплектующие</a>
        </div>
        <div class="footer__content__list">
          <div class="footer__content__list__title">контакты</div>
          <div class="footer__content__list__contact">
            <div class="footer__content__list__contact__icon">
              <img src="@/assets/images/phone-call-hollow.svg" alt="icon" class="footer__content__list__contact__icon__image">
            </div>
            <a href="tel:+73912095757" class="footer__content__list__contact__value  list_option">+7 (391) 209-57-57</a>
          </div>
          <div class="footer__content__list__contact">
            <div class="footer__content__list__contact__icon">
              <img src="@/assets/images/phone-call-hollow.svg" alt="icon" class="footer__content__list__contact__icon__image">
            </div>
            <a href="tel:+73912095757" class="footer__content__list__contact__value  list_option">+7 (391) 209-57-57</a>
          </div>
          <div class="footer__content__list__contact">
            <div class="footer__content__list__contact__icon">
              <img src="@/assets/images/email-hollow.svg" alt="icon" class="footer__content__list__contact__icon__image">
            </div>
            <a href="mailto:los-bio@mail.ru" class="footer__content__list__contact__value  list_option  text_underline">los-bio@mail.ru</a>
          </div>
          <div class="footer__content__list__contact">
            <div class="footer__content__list__contact__icon">
              <img src="@/assets/images/back-arrow-1.svg" alt="icon" class="footer__content__list__contact__icon__image">
            </div>
            <a href="tel:+73912095757" class="footer__content__list__contact__value  list_option  text_underline">Заказать звонок</a>
          </div>
          <button class="footer__content__list__contact__button  main-button-style">Получить КП</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

</script>

<style lang="scss" scoped>
@import "@/assets/styles/styles.scss";

.requisites_option {
  font-weight: 400;
  color: $main-text-color;
  margin-right: 8px;
}

  .list_option {
    font-size: 16px;
    font-weight: 400;
    color: $main-2-text-color;
  }
  .text_underline {
    text-decoration: underline;
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg,rgba(6, 11, 23, 1) 0%, rgba(9, 11, 26, 1) 100%);
    &__content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 89px 0px;
      &__info {
        width: 240px;
        display: flex;
        flex-direction: column;
        &__logo {
          max-width: 100%;
          margin-bottom: 30px;
          cursor: pointer;
          &__image {
            width: 100%;
            height: 100%;
          }
        }
        &__name {
          color: $main-text-color;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        &__requisites {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          font-size: 14px;
          line-height: 164%;
          &__name {
            font-weight: 500;
            color: $grey-text-color;
            margin-right: 4px;
          }
        }
      }
      &__list {
        display: flex;
        flex-direction: column;
        max-width: 179px;
        &__title {
          font-size: 18px;
          font-weight: 600;
          color: $main-text-color;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        &__option {
          &:first-letter {
            text-transform: uppercase;
          }
          &:not(:last-child) {
            margin-bottom: 20px;
          }
        }
        &__contact {
          display: flex;
          &__icon {
            max-width: 15px;
            max-height: 15px;
            margin-right: 8px;
            &__image {
              width: 100%;
              height: 100%;
            }
          }
          &__value {
            font-size: 14px;
            color: $main-text-color;
          }
          &__button {
            padding: 8px 20px;
            font-size: 14px;
            border-radius: 4px;
          }
          &:not(:last-child) {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>