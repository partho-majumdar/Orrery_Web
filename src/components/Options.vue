<template>
  <div class="options">
    <div class="form-group">
      <label class="form-title">Orbit Flow</label>
      <div class="input-select">
        <div class="select-item">
          <input
            name="speed"
            id="realtime"
            type="radio"
            value="realtime"
            v-model="speed"
            @change="onSpeedChange"
          />
          <label for="realtime">Live</label>
        </div>
        <div class="select-item">
          <input
            name="speed"
            id="idealized"
            type="radio"
            value="idealized"
            v-model="speed"
            @change="onSpeedChange"
          />
          <label for="idealized">Default</label>
        </div>
      </div>
    </div>
    <div class="music-control">
      <p class="audio-title">Audio</p>
      <div class="music-input">
        <input
          type="range"
          min="0"
          max="100"
          v-model="musicVolume"
          @input="onMusicVolumeChange"
        />
        <span class="music-volume">{{ musicVolume }}%</span>
      </div>
      <button
        class="music-toggle"
        :class="{ playing: musicPlaying }"
        @click="onMusicPlayClick"
      >
        <svg
          v-if="!musicPlaying"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          />
          <path d="M10 16L16 12L10 8V16Z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          />
          <path d="M8 16H10V8H8V16ZM14 8V16H16V8H14Z" />
        </svg>
      </button>
      <audio ref="audio" :volume="musicVolume / 100">
        <source src="../../the-sound-of-universe.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      speed: "idealized",
      musicVolume: 50,
      musicPlaying: false,
    };
  },
  emits: ["speedChanged", "musicVolumeChanged", "musicPlay"],
  methods: {
    onSpeedChange(e) {
      const value = e.target.value;
      this.$emit("speedChanged", value);
    },
    onMusicVolumeChange() {
      this.$refs.audio.volume = this.musicVolume / 100;
      this.$emit("musicVolumeChanged", this.musicVolume);
    },
    onMusicPlayClick() {
      const audio = this.$refs.audio;
      if (this.musicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.musicPlaying = !this.musicPlaying;
      this.$emit("musicPlay");
    },
  },
  mounted() {
    this.$emit("speedChanged", this.speed);
    this.$emit("musicVolumeChanged", this.musicVolume);
  },
};
</script>

<style scoped lang="scss">
.options {
  position: absolute;
  right: 10px;
  top: 10px;

  .form-group {
    margin: 15px 5px;
    text-align: center;

    .form-title {
      font-size: 15px;
      font-weight: bold;
      color: #fff;
    }

    .select-item {
      font-size: 15px;
    }

    .input-select {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: var(--radius);
      padding: 15px;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      gap: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

      .select-item {
        display: flex;
        justify-content: center;
        align-items: center;

        input {
          appearance: none;
          &:checked + label {
            background-color: rgba(255, 255, 255, 0.2);
          }
        }

        label {
          padding: 10px 20px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius);
          cursor: pointer;
          color: white;
          text-align: center;
        }
      }
    }
  }

  .music-control {
    margin-top: 50%;
    margin-left: 20%;

    .audio-title {
      margin-left: 27%;
      margin-bottom: 2%;
    }

    .music-input {
      display: flex;
      align-items: center;

      input[type="range"] {
        width: 100px;
        margin: 0 10px;
      }

      .music-volume {
        font-size: 14px;
        color: #fff;
      }
    }

    .music-toggle {
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      padding: 12px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      margin-left: 29%;
      margin-top: 3%;

      &.playing {
        background-color: rgba(0, 255, 0, 0.5);
        transform: scale(1.1);
      }

      svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: #fff;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.15);
      }
    }
  }
}
</style>
