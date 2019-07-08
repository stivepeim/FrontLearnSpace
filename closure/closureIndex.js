var name = "The Window"
var object = {
  name: 'My Object',
  getNameFunc: function() {
    var that = this
    return function() {
      return this.name + '|' + that.name
    }
  }
}

console.log(object.getNameFunc()())