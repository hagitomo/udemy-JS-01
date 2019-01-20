
class Park {
  constructor(name, buildyear, trees, area) {
    this.name = name
    this.buildyear = buildyear
    this.trees = trees
    this.area = area
  }
  calcAge () {
    var age = new Date().getFullYear() - this.buildyear
    return age
  }
  calcTreeDens() {
    var treeDens = this.trees / this.area
    console.log(`${this.name} has a tree density of ${treeDens} trees per square km`)
  }
}
const GreenPark = new Park('Green park', 1930, 20000, 10)
const NationalPark = new Park('National park', 1920, 200, 20)
const OakPark = new Park('Oak park', 1910, 2020, 30)

const Parks = [GreenPark, NationalPark, OakPark]
function reportParks (parks) {
  // 平均年
  const ages = parks.map((park) => park.calcAge())
  const totalAges = ages.reduce((a, b) =>a + b, 0 )
  console.log(`parks  average of years is ${ totalAges / parks.length}`)

  //  木の密度
  parks.forEach((park) => {
    park.calcTreeDens()
  })

  // 1000より多いか
  const trees = parks.map((park) => park.trees)
  trees.forEach((tree) => {
    if (tree > 1000) {
      const index = trees.indexOf(tree)
      console.log(`${parks[index].name}は1000以上です `)
    }
  })
}
reportParks(Parks)

class Street  {
  constructor(name, buildyear, size=3) {
    this.name = name
    this.buildyear = buildyear
    this.size = size
  }
  aboutStreet() {
    const profile = new Map
    profile.set(1, 'tiny')
    profile.set(2, 'small')
    profile.set(3, 'normal')
    profile.set(4, 'big')
    profile.set(5, 'huge')

    console.log(`${this.name}, build in ${this.buildyear}, size is ${profile.get(this.size)}`)
  }
}

const hogeStreet = new Street('hoge str', 1930, 2)
hogeStreet.aboutStreet()
