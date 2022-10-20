<template>
  <div class="page-about">
    <h3 class="page-about__title">О компании</h3>
    <div class="page-about__content">
      <div class="page-about__content-bar ">
        <div class="item">
          <div class="hint">ПО:</div>
          <div class="descript">v1.02</div>
        </div>
        <div class="item">
          <div class="hint">Компания:</div>
          <div class="descript">Моя компания</div>
        </div>
        <div class="item">
          <div class="hint">Вебсайт:</div>
          <div class="descript">-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExampleBlockModalAbout',
};

</script>

<style lang="scss" scoped>
.page-about {
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 400;
  &__title {
    font-size: 22px;
    line-height: 130%;
    color: #1b2e47;
    padding: 0 0 26px 0;
    display: flex;
    gap: 16px;
  }
  &__content {
    padding: 20px;
    display: flex;
    border: 1px solid #e7e8ea;
    border-radius: 8px;
    margin-bottom: 20px;
    &-bar {
      min-width: 30%;
      .item {
        display: flex;
        .hint {
          flex-shrink: 1;
          min-width: 160px;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: 0px;
          text-align: left;
          color: #a4b0b5;
        }
        .descript {
          flex-shrink: 1;
          min-width: 240px;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: 0px;
          text-align: left;
          color: #3a4042;
          &:hover {
            color: var(--color-primary);
          }
        }
      }
    }
  }
}
</style>
