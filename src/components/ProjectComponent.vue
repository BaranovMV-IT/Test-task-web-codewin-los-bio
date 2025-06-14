<template>
  <div class="main__content">
        <div class="main__content__path">
          <div class="main__content__path__item  advantages_text">главная</div>
          <div class="main__content__path__separator"></div>
          <div class="main__content__path__item  advantages_text">проекты</div>
          <div class="main__content__path__separator"></div>
          <div class="main__content__path__item  path_text">{{ selectedProject?.title }}</div>
        </div>
        <div class="main__content__data">
          <div class="main__content__data__info">
            <div class="main__content__data__info__title  advantages_text">{{ selectedProject?.title }}</div>
            <div class="main__content__data__info__text">
              <div class="main__content__data__info__text__list">
                <div 
                  v-for="item in selectedProjectText"
                  :key="item.header + item.paragraph"
                  class="main__content__data__info__text__list__item  advantages_text  info_text"
                >
                  {{ item.header + " " + item.paragraph }}
                </div>
              </div>
            </div>
            <div class="main__content__data__info__advantages" v-if="selectedProjectAdvantages">
              <div class="main__content__data__info__advantages__title  advantages_text">почему клиенты выбирают ЛОС:</div>
              <div class="main__content__data__info__advantages__list">
                <div 
                  v-for="item in selectedProjectAdvantages"
                  :key="item.name + item.text"
                  class="main__content__data__info__advantages__list__item"
                >
                  <div class="main__content__data__info__advantages__list__item__point"></div>
                  <div class="main__content__data__info__advantages__list__item__text  advantages_text">{{ item.name + ": " + item.text }}</div>
                </div>
              </div>
            </div>
            <div class="main__content__data__info__additional" v-if="selectedProjectAdditional">
              <div class="main__content__data__info__advantages__title  advantages_text">также лос выбирают за:</div>
              <div class="main__content__data__info__additional__list">
                <div 
                  v-for="itemId in selectedProjectAdditional?.length"
                  :key="selectedProjectAdditional[itemId - 1]?.name + selectedProjectAdditional[itemId - 1]?.text"
                  class="main__content__data__info__additional__list__item"
                >
                  <div class="main__content__data__info__additional__list__item__point">{{ itemId }}</div>
                  <div class="main__content__data__info__additional__list__item__rows">
                    <div class="main__content__data__info__additional__list__item__rows__name  advantages_text">{{ selectedProjectAdditional[itemId - 1]?.name }}</div>
                    <div class="main__content__data__info__additional__list__item__rows__text  advantages_text">{{ selectedProjectAdditional[itemId - 1]?.text }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main__content__data__posters">
            <div class="main__content__data__posters__general">
              <img :src="'https://api.los-bio.ru/files/projects/' + selectedProject?.photos[0]?.name" alt="poster" class="main__content__data__posters__general__image">
              <button class="main__content__data__posters__general__button  main-button-style">Следующее фото</button>
            </div>
            <div class="main__content__data__posters__minorities" v-if="selectedProject?.photos[1]?.name">
              <div class="main__content__data__posters__minorities__list">
                <div 
                  v-for="image in selectedProject?.photos"
                  :key="image.name"
                  class="main__content__data__posters__minorities__list__item"
                >
                  <img :src="'https://api.los-bio.ru/files/projects/' + image.name" alt="poster" class="main__content__data__posters__minorities__list__item__image">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "ProjectComponent",
  props: {
    projectsData: {
      required: true
    }
  },
  data(){
    return {
      selectedProjectSlug: null,
      selectedProject: null,
      selectedProjectText: null,
      selectedProjectAdvantages: null,
      selectedProjectAdditional: null
    }
  },
  methods: {
    setSelectedProject(){
      this.selectedProjectSlug = this.$route.query.project;
      for(let project of this.projectsData){
        if(project.slug == this.selectedProjectSlug){
          this.selectedProject = project;
          break;
        }
      }

      let projectText = [];
      let projectAdvantages = [];
      let projectAdditional = [];
      try {
        projectAdditional = [...this.selectedProject.description.blocks];
        let paragraph = {};
        for(let block of projectAdditional){
          if(block.type == "header"){
            paragraph = {...paragraph, header: block.data.text.replace(/<(.|\n)*?>/g, '')};
          }
          if(block.type == "paragraph"){
            paragraph = {...paragraph, paragraph: block.data.text.replace(/<(.|\n)*?>/g, '')};
            projectText.push(paragraph);
          }
          if(block.type == "Products"){
            paragraph = {...paragraph, paragraph: block.data.link.replace(/<(.|\n)*?>/g, '')};
            projectText.push(paragraph);
          }
        }
        
        projectAdvantages = projectAdditional.filter(block => block.type == "list")[0]?.data.items;
        projectAdvantages = projectAdvantages?.map(str => {
          const name = str.split(":")[0].replace(/<(.|\n)*?>/g, '');
          const text = str.split(":")[1].replace(/<(.|\n)*?>/g, '');
          const obj = {name: name, text: text};
          return obj
        });

        projectAdditional = [...projectAdditional].reverse();
        projectAdditional = projectAdditional.filter(block => block.type == "list")[0]?.data.items;
        projectAdditional = projectAdditional?.map(str => {
          const name = str.split(":")[0].replace(/<(.|\n)*?>/g, '');
          const text = str.split(":")[1].replace(/<(.|\n)*?>/g, '');
          const obj = {name: name, text: text};
          return obj
        });
      } catch(e) {
        projectText = [];
        projectAdvantages = [];
        projectAdditional = [];
        console.log(e.message);
      }

      this.selectedProjectText = projectText;
      this.selectedProjectAdvantages = projectAdvantages;
      this.selectedProjectAdditional = projectAdditional;
    }
  },
  created(){
    let interval = setInterval(()=>{
      if(this.projectsData){
        this.setSelectedProject();
        clearInterval(interval);
      }
    }, 10);
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
      &__path {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        margin: 13px 0px 37px 0px;
        &__item {
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        &__separator {
          min-width: 3px;
          max-width: 3px;
          min-height: 3px;
          max-height: 3px;
          margin: 0px 14px 0px 14px;
          background-color: $theme-main-color;
        }
      }
      &__data {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 69px;
        &__info {
          position: relative;
          min-width: 691px;
          max-width: 691px;
          display: flex;
          flex-direction: column;
          padding: 35px 40px 52px 40px;
          background-color: rgba(18, 21, 35, 0.49);
          border-radius: 19px;
          &__title {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 25px;
          }
          &__text {
            color: $main-2-text-color;
            margin-bottom: 30px;
            &__list {
              &__item {
                font-size: 18px;
                font-weight: 400;
                line-height: 150%;
                &:not(:last-child){
                  margin-bottom: 30px;
                }
              }
            }
          }
          &__advantages {
            display: flex;
            flex-direction: column;
            margin-bottom: 50px;
            &__title {
              font-size: 18px;
              font-weight: 700;
              color: $main-2-text-color;
              margin-bottom: 25px;
              text-transform: uppercase;
            }
            &__list {
              display: flex;
              flex-direction: column;
              &__item {
                display: flex;
                align-items: center;
                &__point {
                  min-width: 12px;
                  max-width: 12px;
                  min-height: 12px;
                  max-height: 12px;
                  border: 2px solid $theme-main-color;
                  border-radius: 50%;
                  margin-right: 10px;
                }
                &__text {
                  font-size: 18px;
                  font-weight: 400;
                }
                &:not(:last-child){
                  margin-bottom: 25px;
                }
              }
            }
          }
          &__additional {
            display: flex;
            flex-direction: column;
            &__list {
              display: flex;
              flex-direction: column;
              &__item {
                display: flex;
                &__point {
                  min-width: 24px;
                  max-width: 24px;
                  min-height: 24px;
                  max-height: 24px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 16px;
                  font-weight: 600;
                  color: $theme-main-color;
                  border: 2px solid $theme-main-color;
                  border-radius: 50%;
                  margin-right: 10px;
                  overflow: hidden;
                }
                &__rows {
                  display: flex;
                  flex-direction: column;
                  &__name {
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                  }
                  &__text {
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 160%;
                  }
                }
                &:not(:last-child){
                  margin-bottom: 25px;
                }
              }
            }
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
        &__posters {
          min-width: 433px;
          max-width: 433px;
          height: fit-content;
          &__general {
            position: relative;
            min-width: 100%;
            max-width: 100%;
            min-height: 300px;
            max-height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            &__image {
              width: 100%;
            }
            &__button {
              position: absolute;
              padding: 8px 20px;
              font-size: 14px;
              font-weight: 500;
              border-radius: 4px;
              bottom: 5px;
              right: 1px;
            }
          }
          &__minorities {
            min-width: 100%;
            max-width: 100%;
            height: fit-content;
            &__list {
              min-width: 100%;
              max-width: 100%;
              height: fit-content;
              display: flex;
              flex-wrap: wrap;
              &__item {
                min-width: 86px;
                max-width: 86px;
                min-height: 64px;
                max-height: 64px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                cursor: pointer;
                &__image {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  .path_text {
    color: rgba(255, 255, 255, 0.13);
    cursor: default;
  }
</style>