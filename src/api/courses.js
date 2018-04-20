import axios from 'axios'

export default class {
  constructor () {
    this.faculties = [
      'wgig',
      'wmn',
      'weip',
      'wimiip',
      'wggios',
      'wimic',
      'weaiiib',
      'wggiis',
      'wieit',
      'wfiis',
      'wz',
      'wh',
      'wimir',
      'wo',
      'wgtjz',
      'wiwm',
      'wwnig',
      'wms'
    ]
    this.categories = {}
    this.cats_names = []
    this.axiosInstance = axios.create({
      url: 'https://syllabuskrk.agh.edu.pl/2017-2018/magnesite/api/faculties',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'pl',
        'Accept': 'application/vnd.syllabus.agh.edu.pl.v2+json'
      }
    })
  }

  getCourses () {
    let promises = []
    this.faculties.forEach((name) => {
      promises.push(this.axiosInstance.get(`https://syllabuskrk.agh.edu.pl/2017-2018/magnesite/api/faculties/${name}/study_plans`))
    })
    return promises
  }

  allPrograms () {
    return new Promise((resolve) => {
      let allCourses = []
      Promise.all(this.getCourses()).then((values) => {
        values.forEach((faculty) => {
          if (faculty.data.syllabus.study_types[0]) {
            faculty.data.syllabus.study_types[0].levels[0].study_programmes.forEach((sp) => (allCourses.push(sp)))
          }
        })
        allCourses.sort((a, b) => a.name.localeCompare(b.name))
        allCourses.forEach((program) => {
          if (!Object.keys(this.categories)) {
            this.categories[program.name] = [program]
            return
          }

          if (this.categories[program.name] === undefined) {
            this.categories[program.name] = [program]
          } else {
            this.categories[program.name].push(program)
          }
        })
        resolve(this.categories)
      })
    })
  }
}
