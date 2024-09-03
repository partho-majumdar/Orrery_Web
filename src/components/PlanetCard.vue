<template>
  <div class="planet-card">
    <img
      class="planet-img"
      :src="`./assets/cards/${planetInfo.name}.png`"
      :alt="planetInfo.displayName"
    />
    <div class="title">
      <h2>{{ planetInfo.displayName }}</h2>
    </div>
    <button class="close" @click="closeCard">x</button>

    <div class="temperature">
      <TemperatureDetail
        v-if="planetInfo.meanTemp"
        label="Mean"
        :temp="planetInfo.meanTemp"
        :temperatureColor="temperatureColor(planetInfo.meanTemp)"
      />
      <TemperatureDetail
        v-if="planetInfo.minTemp"
        label="Min"
        :temp="planetInfo.minTemp"
        :temperatureColor="temperatureColor(planetInfo.minTemp)"
      />
      <TemperatureDetail
        v-if="planetInfo.maxTemp"
        label="Max"
        :temp="planetInfo.maxTemp"
        :temperatureColor="temperatureColor(planetInfo.maxTemp)"
      />
    </div>

    <div class="info">
      <h5>{{ planetInfo.caption }}</h5>
      <p class="description">{{ planetInfo.description }}</p>
      <ul>
        <li>
          Radius: <span class="value">{{ planetInfo.radius }} km</span>
        </li>
        <li
          v-if="
            planetInfo.timesLarger !== undefined &&
            planetInfo.timesLarger !== -1
          "
        >
          <span v-if="planetInfo.timesLarger >= 1">
            <span class="value">{{ planetInfo.timesLarger }}x</span> larger than
            Earth
          </span>
          <span v-else>
            <span class="value"
              >{{ (1 / planetInfo.timesLarger).toFixed(2) }}x</span
            >
            smaller than Earth
          </span>
        </li>
        <li
          v-if="planetInfo.distanceFromSun && planetInfo.distanceFromSun !== -1"
        >
          Distance from Sun:
          <span class="value">{{ planetInfo.distanceFromSun }} AU</span>
        </li>
        <li v-if="planetInfo.distance">
          Distance from {{ capitalize(planetInfo.orbitObject) }}:
          <span class="value">{{ planetInfo.distance }} km</span>
        </li>
        <li v-if="planetInfo.year">
          1 year: <span class="value">{{ planetInfo.year }}</span>
        </li>
        <li v-if="planetInfo.day">
          1 day: <span class="value">{{ planetInfo.day }}</span>
        </li>
        <li v-if="planetInfo.moons !== null">
          Moons: <span class="value">{{ planetInfo.moons }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    planetInfo: Object,
  },
  emits: ["closeCard"],
  data() {
    return {
      temperatureColors: {
        "-130": "#a8f1ff",
        "-90": "#1fb6d0",
        "-40": "#c4f987",
        10: "#c4f987",
        50: "#ffcc33",
        90: "#ee6600",
        150: "#990000",
      },
    };
  },
  methods: {
    temperatureColor(temp) {
      const keys = Object.keys(this.temperatureColors).map((t) => parseInt(t));
      keys.sort((a, b) => a - b);
      for (let key of keys) {
        if (key > temp) {
          return this.temperatureColors[key];
        }
      }
      return this.temperatureColors[keys[keys.length - 1]];
    },
    closeCard() {
      this.$emit("closeCard");
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
};

const TemperatureDetail = {
  props: {
    label: String,
    temp: Number,
    temperatureColor: String,
  },
  template: `
    <p :title="label + ' surface temperature'">
      {{ label }}:
      <span class="value" :style="{ color: temperatureColor }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :stroke="temperatureColor"
          class="icon icon-tabler icon-tabler-temperature"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
          <line x1="10" y1="9" x2="14" y2="9" />
        </svg>
        {{ temp }} °C
      </span>
    </p>
  `,
};
</script>

<style scoped lang="scss">
.planet-card {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #777;

  .planet-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .title {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    z-index: 1;

    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
    }
  }

  .temperature {
    position: absolute;
    top: 60px;
    right: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;

    .value {
      font-weight: bold;
      text-shadow: 0 0 5px #000;
    }

    .icon {
      vertical-align: middle;
    }
  }

  .info {
    margin-top: 200px;
    padding: 20px;

    h5 {
      text-align: center;
      font-size: 18px;
      // color: #444;
      color: #666;
      font-weight: 400;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 10px 0;

      li {
        margin: 4px 0;
        color: #666;

        .value {
          font-weight: bold;
        }
      }
    }
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    z-index: 2;
  }

  .description {
    margin-top: 10px;
  }

  @media (max-width: 600px) {
    width: 90%;
    height: auto;
    top: 20px;
    left: 10px;
    transform: none;

    .planet-img {
      height: 150px;
    }

    .info {
      margin-top: 160px;
    }

    .close {
      font-size: 28px;
    }
  }
}
</style>
