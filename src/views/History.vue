<template>
  <div>
    <div class="page-title">
      <h3>{{'Record_History' | localize}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{'Message_RecordNotFound' | localize}}.
      <router-link to="/record">{{'AddFirst' | localize}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev' | localize"
        :next-text="'Next' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable.vue';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'history',
  metaInfo() {
    return {
      title: localizeFilter('Menu_History'),
    };
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map((record) => {
        const rec = {
          ...record,
          categoryName: categories.find((c) => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
        };
        return rec;
      }));
    },
  },
  components: {
    HistoryTable,
  },
};
</script>
