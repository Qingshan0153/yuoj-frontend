
<template>
  <div class="circle">
    <div class="left">
      <div class="left-circle"></div>
    </div>
    <div class="right">
      <div class="right-circle"></div>
    </div>
    <div class="inner">
      <span>{{ num }}</span> %
    </div>
  </div>
</template>

<script type="text/javascript">
import { ref, onMounted } from "vue";

export default {
  setup() {
    const num = ref(0);
    let leftCircle;
    let rightCircle;
    let loader = 400;
    let total = 3381;
    let timer = null;
    let min = 0;
    let max = 1000;

    let ratio = (loader / total) * 100;

    const updateProgress = () => {
      num.value = parseFloat(((min / max) * 100).toFixed(1));
      const deg = Number((min / max) * 360).toFixed(0);
      if (num.value > ratio) {
        clearInterval(timer);
      } else {
        min++; // 增加loader的值
        if (deg > 180) {
          leftCircle.style.transform = `rotate(${deg}deg)`;
        } else {
          rightCircle.style.transform = `rotate(-${180 - deg}deg)`;
        }
      }
    };

    onMounted(() => {
      leftCircle = document.querySelector(".left-circle");
      rightCircle = document.querySelector(".right-circle");

      timer = setInterval(updateProgress, 1);
    });

    return { num };
  },
};
</script>

<style scoped>
.circle {
  width: 100px;
  height: 100px;
  background: #dfdfdf;
  position: relative;
  border-radius: 50%;
}

.left .left-circle,
.right .right-circle {
  width: 50px;
  height: 100px;
  background: #ffb800;
  /* opacity: 0.5;*/
  /*transition: all 0.5s;*/
}

.left .left-circle {
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  transform-origin: right center;
  transform: rotate(180deg);
  //animation: progress1 2s linear forwards; //animation-delay: 2s;
}

.right .right-circle {
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  transform-origin: left center;
  /*  background: blue;*/
  transform: rotate(-180deg);
  //animation: progress2 2s linear forwards;
}

/*@keyframes progress1 {
  to {
    transform: rotate(360deg);
  }
}

@keyframes progress2 {
  to {
    transform: rotate(0deg);
  }
}*/

.left,
.right {
  width: 50px;
  height: 100px;
  position: absolute;
  opacity: 0.5;
  overflow: hidden;
}

.right {
  right: 0;
}

/*
.left:hover .left-circle {
  transform: rotate(360deg);
}

.right:hover .right-circle {
  transform: rotate(0deg);
}
*/

.inner {
  width: 93px;
  height: 93px;
  border-radius: 50%;
  text-align: center;
  line-height: 90px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #1c1c1c;
  font-size: 20px;
  background: white;
  z-index: 10; /* 修改为一个较小的值，以确保它在最上层 */
}
</style>
