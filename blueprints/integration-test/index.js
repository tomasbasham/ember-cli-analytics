/*jshint node:true*/
module.exports = {
  description: 'Generate an integration adapter unit test.',

  /*
   * Define a series of custom
   * template variables.
   *
   * @method locals
   *
   * @params {Object} options
   *   Object containing general and entity-specific options.
   */
  locals: function(options) {
    return {
      friendlyTestDescription: 'Unit | Integration | ' + options.entity.name
    };
  }
};
