import Ember from 'ember';

export default Ember.Controller.extend({


  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageLongEnough: Ember.computed.gte('message.length', 5),

  isValid: Ember.computed.and('isValidEmail', 'isMessageLongEnough'),
  isDisabled : Ember.computed.not('isValid'),
  actions: {
    sendMessage: function() {
      var email = this.get('emailAddress');
      var message = this.get('message');
      const newContact = this.store.createRecord('contact',{email: email, message: message });
      newContact.save().then((response)=> {
        var responseMessage = 'To: '+ email + ', Message: '+message;
        this.set('responseMessage', responseMessage);
        this.set('emailAddress', '');
        this.set('message','');
      })
    }
  }
});
