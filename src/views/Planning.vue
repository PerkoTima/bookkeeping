<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length"
    >{{'Message_CategoriesNotFound' | localize}}. <router-link to="/categories"
    >{{'AddNewCategory' | localize}}</router-link></p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} {{'OutOf' | localize}} {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: localizeFilter('Menu_Planning'),
    };
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categoires = await this.$store.dispatch('fetchCategories');

    this.categories = categoires.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          const acc = total + +record.amount;
          return acc;
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      let progressColor = '';
      if (percent < 60) {
        progressColor = 'green';
      } else if (percent < 100) {
        progressColor = 'yellow';
      } else {
        progressColor = 'red';
      }

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>
