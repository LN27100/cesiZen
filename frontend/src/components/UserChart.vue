<template>
  <div>
    <canvas ref="userChartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "UserChart",
  props: {
    userData: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.userChartCanvas.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.userData.map((data) => data.label),
          datasets: [
            {
              label: "Nombre d'utilisateurs",
              data: this.userData.map((data) => data.value),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
