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
        if(scrollElem.scrollLeft >= (scrollPositions[i] - (slideWidth * 0.5))){
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
              max-width: 1170px;
              min-width: 100%;
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

@media (max-width: 1200px){
  .main__content__slider {
    margin: 40px 0px 80px 0px;
    height: 500px;
  }
  .main__content__slider__window__list__item {
    max-width: 1000px;
  }
  .main__content__slider__window__list__item__info {
    min-width: 500px;
    max-width: 500px;
    padding: 15px 0px 25px 0px;
  }
  .main__content__slider__window__list__item__info__title {
    font-size: 50px;
    margin-bottom: 25px;
  }
  .main__content__slider__window__list__item__info__text {
    font-size: 18px;
  }
  .main__content__slider__window__list__item__info__button {
    padding: 14px 35px;
  }
  .main__content__slider__window__list__item__poster__image {
    min-width: 325px;
    max-width: 325px;
  }
  .main__content__slider__pagination__menu__option {
    width: 30px;
    max-width: 30px;
    height: 30px;
    max-height: 30px;
  }



  .main__content__title {
    font-size: 38px;
    margin-bottom: 40px;
  }
  .main__content__advantages {
    margin-bottom: 80px;
  }
  .main__content__advantages__list {
    margin: -13px;
  }
  .main__content__advantages__list__item {
    width: 487px;
    padding: 30px 40px;
    margin: 13px;
  }
  .main__content__advantages__list__item__header__icon {
    min-width: 65px;
    max-width: 65px;
    min-height: 65px;
    max-height: 65px;
    margin-right: 20px;
  }
  .main__content__advantages__list__item__header__title {
    font-size: 25px;
  }
  .main__content__advantages__list__item__text {
    font-size: 17px;
  }



  .main__content__projects {
    margin-bottom: 80px;
  }
  .main__content__projects__list {
    margin: -7px;
  }
  .main__content__projects__list__item {
    width: 324px;
    padding: 30px;
    margin: 7px;
  }
  .main__content__projects__list__item__poster {
    margin-bottom: 25px;
    min-height: 185px;
    max-height: 185px;
  }
  .main__content__projects__list__item__title {
    font-size: 16px;
  }
  .main__content__projects__list__item__name {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .main__content__projects__list__item__info {
    font-size: 15px;
  }
  .main__content__projects__list__item__separator {
    margin: 12px 0px;
  }
}
@media (max-width: 991px){
  .main__content__slider {
    margin: 20px 0px 40px 0px;
    height: 450px;
  }
  .main__content__slider__window__list__item {
    max-width: 850px;
  }
  .main__content__slider__window__list__item__info {
    min-width: 450px;
    max-width: 450px;
    padding: 15px 0px 25px 0px;
  }
  .main__content__slider__window__list__item__info__title {
    font-size: 35px;
    margin-bottom: 20px;
  }
  .main__content__slider__window__list__item__info__text {
    font-size: 17px;
  }
  .main__content__slider__window__list__item__info__button {
    padding: 10px 25px;
    font-size: 16px;
    border-radius: 10px;
  }
  .main__content__slider__window__list__item__poster__image {
    min-width: 300px;
    max-width: 300px;
  }
  .main__content__slider__pagination__menu__option {
    width: 25px;
    max-width: 25px;
    height: 25px;
    max-height: 25px;
  }
  .main__content__slider__pagination__menu__option__outer-circle {
    width: 15px;
    max-width: 15px;
    height: 15px;
    max-height: 15px;
  }
  .main__content__slider__pagination__menu__option__inner-circle {
    width: 10px;
    max-width: 10px;
    height: 10px;
    max-height: 10px;
  }



  .main__content__title {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .main__content__advantages {
    margin-bottom: 50px;
  }
  .main__content__advantages__list {
    margin: -5px;
  }
  .main__content__advantages__list__item {
    width: 420px;
    padding: 20px 30px;
    margin: 5px;
  }
  .main__content__advantages__list__item__header {
    margin-bottom: 7px;
  }
  .main__content__advantages__list__item__header__icon {
    min-width: 50px;
    max-width: 50px;
    min-height: 50px;
    max-height: 50px;
    margin-right: 15px;
  }
  .main__content__advantages__list__item__header__title {
    font-size: 20px;
  }
  .main__content__advantages__list__item__text {
    font-size: 16px;
  }



  .main__content__projects {
    margin-bottom: 60px;
  }
  .main__content__projects__list {
    margin: -5px;
  }
  .main__content__projects__list__item {
    width: 276px;
    padding: 20px;
    margin: 5px;
  }
  .main__content__projects__list__item__poster {
    margin-bottom: 15px;
    min-height: 150px;
    max-height: 150px;
  }
  .main__content__projects__list__item__name {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .main__content__projects__list__item__title {
    font-size: 16px;
  }
  .main__content__projects__list__item__info {
    font-size: 14px;
  }
  .main__content__projects__list__item__separator {
    margin: 12px 0px;
  }
}
@media (max-width: 768px){
  .main__content__slider {
    margin: 10px 0px 20px 0px;
    height: 300px;
  }
  .main__content__slider__window__list__item {
    max-width: 400px;
  }
  .main__content__slider__window__list__item__info {
    min-width: 300px;
    max-width: 300px;
    padding: 10px 0px 15px 0px;
    z-index: 2;
  }
  .main__content__slider__window__list__item__info__title {
    font-size: 25px;
    margin-bottom: 15px;
  }
  .main__content__slider__window__list__item__info__text {
    font-size: 14px;
  }
  .main__content__slider__window__list__item__info__button {
    padding: 7px 15px;
    font-size: 14px;
    border-radius: 7px;
  }
  .main__content__slider__window__list__item__poster__image {
    min-width: 250px;
    max-width: 250px;
    margin-left: -150px;
  }
  .main__content__slider__pagination__menu__option {
    width: 20px;
    max-width: 20px;
    height: 20px;
    max-height: 20px;
  }
  .main__content__slider__pagination__menu__option__outer-circle {
    width: 12px;
    max-width: 12px;
    height: 12px;
    max-height: 12px;
  }
  .main__content__slider__pagination__menu__option__inner-circle {
    width: 8px;
    max-width: 8px;
    height: 8px;
    max-height: 8px;
  }



  .main__content__title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .main__content__advantages {
    margin-bottom: 40px;
  }
  .main__content__advantages__list {
    margin: -5px;
  }
  .main__content__advantages__list__item {
    width: 400px;
    padding: 15px 20px;
    margin: 5px;
  }
  .main__content__advantages__list__item__header {
    margin-bottom: 7px;
  }
  .main__content__advantages__list__item__header__icon {
    min-width: 35px;
    max-width: 35px;
    min-height: 35px;
    max-height: 35px;
    margin-right: 10px;
  }
  .main__content__advantages__list__item__header__title {
    font-size: 16px;
  }
  .main__content__advantages__list__item__text {
    font-size: 13px;
  }



  .main__content__projects {
    margin-bottom: 40px;
  }
  .main__content__projects__list {
    margin: -5px;
  }
  .main__content__projects__list__item {
    width: 400px;
    padding: 20px;
    margin: 5px;
  }
  .main__content__projects__list__item__poster {
    margin-bottom: 20px;
    min-height: 130px;
    max-height: 130px;
  }
  .main__content__projects__list__item__name {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .main__content__projects__list__item__title {
    font-size: 15px;
  }
  .main__content__projects__list__item__info {
    font-size: 15px;
  }
  .main__content__projects__list__item__separator {
    margin: 5px 0px;
  }
}
@media (max-width: 375px){
  .main__content__slider {
    margin: 10px 0px 20px 0px;
    height: 350px;
  }
  .main__content__slider__window__list__item {
    max-width: 350px;
  }
  .main__content__slider__window__list__item__info {
    min-width: 275px;
    max-width: 275px;
    padding: 10px 0px 15px 0px;
    z-index: 2;
  }
  .main__content__slider__window__list__item__info__title {
    font-size: 25px;
    margin-bottom: 15px;
  }
  .main__content__slider__window__list__item__info__text {
    font-size: 14px;
  }
  .main__content__slider__window__list__item__info__button {
    padding: 7px 15px;
    font-size: 14px;
    border-radius: 7px;
  }
  .main__content__slider__window__list__item__poster__image {
    min-width: 200px;
    max-width: 200px;
    margin-left: -150px;
  }
  .main__content__slider__pagination__menu__option {
    width: 20px;
    max-width: 20px;
    height: 20px;
    max-height: 20px;
  }
  .main__content__slider__pagination__menu__option__outer-circle {
    width: 12px;
    max-width: 12px;
    height: 12px;
    max-height: 12px;
  }
  .main__content__slider__pagination__menu__option__inner-circle {
    width: 8px;
    max-width: 8px;
    height: 8px;
    max-height: 8px;
  }



  .main__content__title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .main__content__advantages {
    margin-bottom: 40px;
  }
  .main__content__advantages__list {
    margin: -5px;
  }
  .main__content__advantages__list__item {
    width: 350px;
    padding: 10px 15px;
    margin: 5px;
  }
  .main__content__advantages__list__item__header {
    margin-bottom: 7px;
  }
  .main__content__advantages__list__item__header__icon {
    min-width: 35px;
    max-width: 35px;
    min-height: 35px;
    max-height: 35px;
    margin-right: 10px;
  }
  .main__content__advantages__list__item__header__title {
    font-size: 16px;
  }
  .main__content__advantages__list__item__text {
    font-size: 13px;
  }



  .main__content__projects {
    margin-bottom: 40px;
  }
  .main__content__projects__list {
    margin: -5px;
  }
  .main__content__projects__list__item {
    width: 350px;
    padding: 10px;
    margin: 5px;
  }
  .main__content__projects__list__item__poster {
    margin-bottom: 10px;
    min-height: 130px;
    max-height: 130px;
  }
  .main__content__projects__list__item__name {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .main__content__projects__list__item__title {
    font-size: 14px;
  }
  .main__content__projects__list__item__info {
    font-size: 14px;
  }
  .main__content__projects__list__item__separator {
    margin: 5px 0px;
  }
}
</style>
