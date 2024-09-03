<template>
  <div>
    <div ref="loading" class="loading-screen">
      <div class="floating-objects">
        <div class="cube"></div>
        <div class="triangle"></div>
        <div class="hexagon"></div>
      </div>
      <p>Loading the Universe...</p>
    </div>

    <!-- This will be hidden initially -->
    <Scene ref="content" @onSceneLoad="onSceneLoad" />
  </div>
</template>

<script>
import Scene from "./components/Scene.vue";
export default {
  components: {
    Scene,
  },
  methods: {
    onSceneLoad() {
      // Hide the loader and show the content when loading is done
      this.$refs.loading.style.display = "none";
      this.$refs.content.style.visibility = "visible";
      this.$refs.content.style.opacity = "1";
    },
  },
  mounted() {
    // Initially hide the content
    this.$refs.content.style.visibility = "hidden";
    this.$refs.content.style.opacity = "0";
  },
};
</script>

<style scoped lang="scss">
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  background-color: rgb(4, 5, 25);
  color: white;
}

.floating-objects {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cube,
  .triangle,
  .hexagon {
    position: absolute;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    animation: float 4s ease-in-out infinite alternate;
  }

  .cube {
    width: 40px;
    height: 40px;
    top: 0;
    left: 50%;
    transform: translateX(-50%) rotate(0deg);
    animation: float 3s ease-in-out infinite alternate,
      rotate-cube 5s linear infinite;
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid rgba(255, 255, 255, 0.7);
    bottom: 0;
    left: 0;
    animation: float 3.5s ease-in-out infinite alternate,
      rotate-triangle 4s linear infinite;
  }

  .hexagon {
    width: 30px;
    height: 30px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    animation: float 4s ease-in-out infinite alternate,
      rotate-hexagon 6s linear infinite;
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

@keyframes rotate-cube {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes rotate-triangle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-hexagon {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
