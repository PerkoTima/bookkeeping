<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Menu_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? 'Income' : 'Outcome' | localize}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
          :class="{'red': record.type === 'outcome', 'green': record.type === 'income'}">
            <div class="card-content white-text">
              <p>{{'Record_Description' | localize}}: {{record.description}}</p>
              <p>{{'Record_Sum' | localize}}: {{record.amount | currency}}</p>
              <p>{{'Record_Category' | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else
    >{{'RecordWithName' | localize}} id={{$route.params.id}} {{'NotFound' | localize}}</p>
</div>
</template>
<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'detail-record',
  metaInfo() {
    return {
      title: localizeFilter('Menu_History'),
    };
  },
  data: () => ({
    recording: null,
    loading: true,
  }),
  async mounted() {
    const id1 = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id1);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>
