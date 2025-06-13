<template>
  <main class="main">
    <div class="container">
      <div class="main__content">
        <div class="main__content__slider">
          <div class="main__content__slider__window">
            <div class="main__content__slider__window__list">
              <div class="main__content__slider__window__list__item">
                <div class="main__content__slider__window__list__item__info">
                  <div class="main__content__slider__window__list__item__info__title  advantages_text">автономная канализация для частного дома</div>
                  <div class="main__content__slider__window__list__item__info__text  advantages_text">производим автономные канализации, очистные сооружения, накопительные ёмкости и различные комплектующие к ним.</div>
                  <button class="main__content__slider__window__list__item__info__button  main-button-style">Перейти в каталог</button>
                </div>
                <div class="main__content__slider__window__list__item__poster">
                  <img src="" alt="poster" class="main__content__slider__window__list__item__poster__image">
                </div>
              </div>
            </div>
          </div>
          <div class="main__content__slider__pagination">
            <div class="main__content__slider__pagination__menu">
              <div class="main__content__slider__pagination__menu__option  option_selected">
                <div class="main__content__slider__pagination__menu__option__outer-circle">
                  <div class="main__content__slider__pagination__menu__option__inner-circle"></div>
                </div>
              </div>
              <div class="main__content__slider__pagination__menu__option">
                <div class="main__content__slider__pagination__menu__option__outer-circle">
                  <div class="main__content__slider__pagination__menu__option__inner-circle"></div>
                </div>
              </div>
              <div class="main__content__slider__pagination__menu__option">
                <div class="main__content__slider__pagination__menu__option__outer-circle">
                  <div class="main__content__slider__pagination__menu__option__inner-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main__content__advantages">
          <div class="main__content__title  advantages_text">наши преимущества</div>
          <div class="main__content__advantages__list">
            <div class="main__content__advantages__list__item">
              <div class="main__content__advantages__list__item__header">
                <div class="main__content__advantages__list__item__header__icon">
                  <img src="" alt="icon" class="main__content__advantages__list__item__header__icon__image">
                </div>
                <div class="main__content__advantages__list__item__header__title  advantages_text">оперативность расчётов</div>
              </div>
              <div class="main__content__advantages__list__item__text  advantages_text">рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки</div>
            </div>
          </div>
        </div>
        <div class="main__content__projects">
          <div class="main__content__title  advantages_text">проекты</div>
          <div class="main__content__projects__list">
            <div class="main__content__projects__list__item">
              <div class="main__content__projects__list__item__poster">
                <img src="" alt="poster" class="main__content__projects__list__item__poster__image"/>
              </div>
              <div class="main__content__projects__list__item__name  advantages_text">проект 1</div>
              <div class="main__content__projects__list__item__title  advantages_text">mauris varius sem lacinia felis pellentesque. Maecenas vulputate tortor mattis consectetur.</div>
              <div class="main__content__projects__list__item__separator"></div>
              <div class="main__content__projects__list__item__info">
                <span class="main__content__projects__list__item__info__name">Тип работы:</span>
                <span class="info_text">строительство станции биологической очистки</span>
              </div>
              <div class="main__content__projects__list__item__separator"></div>
              <div class="main__content__projects__list__item__info">
                <span class="main__content__projects__list__item__info__name">Заказчик:</span>
                <span class="info_text">ИП Иван Васильев</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/styles.scss";

.advantages_text {
  color: $main-text-color;
  &::first-letter {
    text-transform: uppercase;
  }
}

.info_text {
  font-weight: 400;
  color: $main-2-text-color;
}

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__slider {
        width: 100%;
        height: 533px;
        display: flex;
        flex-direction: column;
        margin: 80px 0px 147px 0px;
        &__window {
          width: 100%;
          flex-grow: 1;
          &__list {
            min-width: 100%;
            min-height: 100%;
            max-height: 100%;
            display: flex;
            overflow-x: scroll;
            scroll-behavior: smooth;
            &::-webkit-scrollbar {
                display: none;
            }
            &__item {
              display: flex;
              min-width: 100%;
              max-width: 1170px;
              min-height: 100%;
              max-height: 100%;
              &__info {
                min-width: 577px;
                max-width: 577px;
                min-height: 100%;
                max-height: 100%;
                display: flex;
                flex-direction: column;
                padding: 23px 0px 40px 0px;
                &__title {
                  font-size: 60px;
                  font-weight: 700;
                  margin-bottom: 30px;
                }
                &__text {
                  font-size: 20px;
                  font-weight: 400;
                  line-height: 150%;
                }
                &__button {
                  padding: 16px 40px;
                  border-radius: 12px;
                  font-size: 18px;
                  font-weight: 500;
                  margin: auto 0px 0px 0px;
                }
              }
              &__poster {
                flex-grow: 1;
                min-height: 100%;
                max-height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                &__image {
                  min-width: 363px;
                  max-width: 363px;
                }
              }
            }
          }
        }
        &__pagination {
          width: 100%;
          &__menu {
            width: fit-content;
            max-width: 33%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            &__option {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 34px;
              max-width: 34px;
              height: 34px;
              max-height: 34px;
              margin-bottom: 4px;
              border-radius: 50%;
              cursor: pointer;
              transition: all ease-in-out 0.25s;
              &:not(:last-child) {
                margin-right: 4px;
              }
              &__outer-circle {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 18px;
                max-width: 18px;
                height: 18px;
                max-height: 18px;
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 50%;
              }
              &__inner-circle {
                display: none;
                width: 12px;
                max-width: 12px;
                height: 12px;
                max-height: 12px;
                background-color: $theme-main-color;
                border-radius: 50%;
              }
              &:hover {
                background-color: rgba(255, 255, 255, 0.05);
              }
            }
          }
        }
      }
      &__title {
        font-size: 42px;
        font-weight: 700;
        margin-bottom: 80px;
      }
      &__advantages {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 147px;
        &__list {
          display: flex;
          flex-wrap: wrap;
          margin: -16px;
          &__item {
            width: 569px;
            display: flex;
            flex-direction: column;
            padding: 40px 50px;
            margin: 16px;
            background-color: rgba(18, 31, 35, 0.5);
            border: 2px solid rgba(18, 31, 35, 0.5);
            border-radius: 19px;
            &__header {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              &__icon {
                min-width: 75px;
                max-width: 75px;
                min-height: 75px;
                max-height: 75px;
                margin-right: 30px;
                &__image {
                  width: 100%;
                  height: 100%;
                }
              }
              &__title {
                font-size: 30px;
                font-weight: 600;
                line-height: 117%;
              }
            }
            &__text {
              font-size: 18px;
              font-weight: 400;
              line-height: 137%;
            }
          }
        }
      }
      &__projects {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 108px;
        &__list {
          display: flex;
          flex-wrap: wrap;
          margin: -10px;
          &__item {
            position: relative;
            width: 376px;
            display: flex;
            flex-direction: column;
            padding: 38px;
            margin: 10px;
            background-color: rgba(18, 21, 35, 0.49);
            border-radius: 19px;
            &__poster {
              min-width: 100%;
              max-width: 100%;
              min-height: 208px;
              max-height: 208px;
              display: flex;
              align-items: center;
              margin-bottom: 37px;
              border-radius: 12px;
              overflow: hidden;
              &__image {
                width: 100%;
              }
            }
            &__name {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 28px;
            }
            &__title {
              font-size: 18px;
              font-weight: 400;
              line-height: 148%;
              color: $main-2-text-color;
            }
            &__info {
              font-size: 16px;
              line-height: 148%;
              &__name {
                color: $grey-2-text-color;
                font-weight: 500;
                margin-right: 4px;
              }
            }
            &__separator {
              width: 95%;
              height: 1px;
              align-self: center;
              margin: 17px 0px;
              background-color: rgba(255, 255, 255, 0.09);
            }
            &:before {
              position: absolute;
              content: '';
              inset: -1px;
              padding: 1px;
              border-radius: 19px;
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%);
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              mask: linear-gradient(fff 0 0) content-box, linear-gradient(#fff 0 0);
              mask-composite: exclude;
              -webkit-mask-composite: xor;
            }
          }
        }
      }
    }
  }

  .option_selected {
    cursor: default;
    background-color: rgba(255, 255, 255, 0.05);
    .main__content__slider__pagination__menu__option__outer-circle {
      background-color: transparent;
    }
    .main__content__slider__pagination__menu__option__inner-circle {
      display: block;
    }
  }
</style>
