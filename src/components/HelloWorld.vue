<script>
import Courses from '../api/courses'
export default {
  name: 'HelloWorld',
  data () {
    return {
      categories: {},
      cats_names: []
    }
  },
  created () {
    const courses = new Courses()
    courses.allPrograms().then((cats) => {
      this.categories = cats
      this.cats_names = Object.keys(this.categories)
    })
  }
}
</script>

<template>
  <div class="">
      <div
        v-for="(sp, index) in cats_names"
        :key="index"
        class="table-nav"
      >
        <h4>{{sp}}</h4>
        <ul>
          <li v-for="sp in categories[sp]" :key="sp.url"><a :href="sp.url">{{sp.name}}</a></li>
        </ul>
      </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
