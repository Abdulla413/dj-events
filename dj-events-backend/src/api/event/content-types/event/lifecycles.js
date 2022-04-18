const slugify = require('slugify');

module.exports = {
  
    async beforeCreate(event) {
 const {data}=event.params;
      if (data.name) {
        data.slug = slugify(data.name, {lower: true});
      }
    },
    async beforeUpdate(params, event) {
 const {data}=event.params;

      if (data.name) {
        data.slug = slugify(data.name, {lower: true});
      }
  },
};
 