<template>
  <main class="main">
    <div class="container">
      <div class="main__content" v-if="selectedProjectSlug == null">
        <div class="main__content__slider">
          <div ref="slider_window" class="main__content__slider__window">
            <div 
              @scrollend="setSelectedSlide()"
              ref="slider_list" 
              class="main__content__slider__window__list"
            >
              <div 
                v-for="sliderItem in sliderData"
                :key="sliderItem.name + sliderItem.id"
                class="main__content__slider__window__list__item"
              >
                <div class="main__content__slider__window__list__item__info">
                  <div class="main__content__slider__window__list__item__info__title  advantages_text">{{ sliderItem.value.title }}</div>
                  <div class="main__content__slider__window__list__item__info__text  advantages_text">{{ sliderItem.value.description }}</div>
                  <button class="main__content__slider__window__list__item__info__button  main-button-style">{{ sliderItem.value.btnText }}</button>
                </div>
                <div class="main__content__slider__window__list__item__poster">
                  <img :src="'https://api.los-bio.ru/files/certificates/' + sliderItem.value.image[0].name" alt="poster" class="main__content__slider__window__list__item__poster__image">
                </div>
              </div>
            </div>
          </div>
          <div class="main__content__slider__pagination">
            <div class="main__content__slider__pagination__menu">
              <div 
                v-for="slideId in sliderData?.length"
                :key="sliderData[slideId]?.name"
                :class="{option_selected: selectedSlide == slideId}"
                @click="showSelectedSlide(slideId)"
                class="main__content__slider__pagination__menu__option"
              >
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
            <div 
              v-for="advantageItem in advantagesData"
              :key="advantageItem.name + advantageItem.id"
              class="main__content__advantages__list__item"
            >
              <div class="main__content__advantages__list__item__header">
                <div class="main__content__advantages__list__item__header__icon">
                  <img :src="advantageItem.value.icon" alt="icon" class="main__content__advantages__list__item__header__icon__image">
                </div>
                <div class="main__content__advantages__list__item__header__title  advantages_text">{{ advantageItem.value.title }}</div>
              </div>
              <div class="main__content__advantages__list__item__text  advantages_text">{{ advantageItem.value.description }}</div>
            </div>
          </div>
        </div>
        <div class="main__content__projects">
          <div class="main__content__title  advantages_text">проекты</div>
          <div class="main__content__projects__list">
            <div 
              v-for="projectItem in projectsData"
              :key="projectItem.slug + projectItem.id"
              @click="setSelectedProjectSlug(projectItem.slug)"
              class="main__content__projects__list__item"
            >
              <div class="main__content__projects__list__item__poster">
                <img :src="'https://api.los-bio.ru/files/projects/' + projectItem.photos[0]?.name" alt="poster" class="main__content__projects__list__item__poster__image"/>
              </div>
              <div class="main__content__projects__list__item__name  advantages_text">{{ projectItem.title }}</div>
              <div class="main__content__projects__list__item__title  advantages_text">{{ projectItem.works }}</div>
              <div class="main__content__projects__list__item__separator"></div>
              <div class="main__content__projects__list__item__info">
                <span class="main__content__projects__list__item__info__name">Тип работы:</span>
                <span class="info_text">{{ projectItem.equipment }}</span>
              </div>
              <div class="main__content__projects__list__item__separator"></div>
              <div class="main__content__projects__list__item__info">
                <span class="main__content__projects__list__item__info__name">Заказчик:</span>
                <span class="info_text">{{ projectItem.customer }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectComponent :projectsData="projectsData" v-else/>
    </div>
  </main>
</template>

<script>
import ProjectComponent from "@/components/ProjectComponent.vue";

export default {
  name: 'HomePage',
  components: {
    ProjectComponent
  },
  data(){
    return {
      sliderData: null,
      selectedSlide: 1,
      advantagesData: null,
      projectsData: null,
      selectedProjectSlug: null
    }
  },
  methods: {
    async getSliderData(){
      try {
        let response = await fetch("https://api.los-bio.ru/info/group/slide", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept":	"*/*",
            "Accept-Encoding": "deflate, gzip",
            "Host":	"api.los-bio.ru"
          }
        });
        response = await response.json();
        const fun = async (res) => {
          res = [...res];
          for(let item of res){
            item.value = await JSON.parse(item.value);
          }
          return res
        }
        response = await fun(response);
        return response
      } catch(e) {
        console.log(e.message);
      }
    },
    showSelectedSlide(slideId){
      const slideWidth = this.$refs.slider_window.offsetWidth;
      const scrollElem = this.$refs.slider_list;
      scrollElem.scrollLeft = (slideId - 1) * slideWidth;
      this.selectedSlide = slideId;
    },
    setSelectedSlide(){
      const slideWidth = this.$refs.slider_window.offsetWidth;
      const scrollElem = this.$refs.slider_list;
      const scrollPositions = this.sliderData.map((slide, id) => {
        return id * slideWidth
      });
      for(let i = scrollPositions.length - 1; i >= 0; i--){
        if(scrollElem.scrollLeft >= scrollPositions[i] - (slideWidth * 0.25)){
          scrollElem.scrollLeft = scrollPositions[i];
          this.selectedSlide = i + 1;
          break;
        }
      }
    },
    setSelectedProjectSlug(projectSlug){
      this.$router.push("/?project=" + projectSlug);
      setTimeout(()=>{
        location.reload();
      }, 1);
    },
    async getAdvantagesData(){
      try {
        let response = await fetch("https://api.los-bio.ru/info/group/advantage", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept":	"*/*",
            "Accept-Encoding": "deflate, gzip",
            "Host":	"api.los-bio.ru"
          }
        });
        response = await response.json();
        const fun = async (res) => {
          res = [...res];
          for(let item of res){
            item.value = await JSON.parse(item.value);
          }
          return res
        }
        response = await fun(response);
        return response
      } catch(e) {
        console.log(e.message);
      }
    },
    async getProjectsData(){
      try {
        let response = await fetch("https://api.los-bio.ru/projects/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept":	"*/*",
            "Accept-Encoding": "deflate, gzip",
            "Host":	"api.los-bio.ru"
          }
        });
        response = await response.json();
        return response
      } catch(e) {
        console.log(e.message);
      }
    }
  },
  async created(){
    if(this.$route.query.project){
      this.selectedProjectSlug = this.$route.query.project;
    }
    this.sliderData = await this.getSliderData();
    this.advantagesData = await this.getAdvantagesData();
    this.projectsData = await this.getProjectsData();
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
            cursor: pointer;
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
