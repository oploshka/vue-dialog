<template>
  <div>
    <div class="cbtn-group">
      <div class="cbtn" @click="isShow=true">show</div>
      <div class="cbtn" @click="isShow=false">hide</div>
      <div class="cbtn" @click="isShow=!isShow">revert</div>
    </div>
    
    <div>
      <TestTransition>
        <div v-if="isShow" class="circle"></div>
      </TestTransition>
    </div>
  </div>
</template>

<script>

import TestTransition from './_component/TestTransition';

export default {
  name: 'TestPage',
  components: {
    TestTransition
  },
  data() {
    return {
      isShow: true,
    };
  }
};
</script>

<style scoped>
.circle {
  width: 100px;
  height: 100px;
  background: #5cb85c;
  border-radius: 100%;
  border: 5px solid green;
}

.cbtn-group {
  display: flex;
  gap: 20px;
  padding-bottom: 24px;
}
.cbtn {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #d6ceff;
  cursor: pointer;
}
</style>
