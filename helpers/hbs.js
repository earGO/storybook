const moment = require('moment')

module.exports = {
    truncate: function(str, len){
        //truncates str if it more than len and st.len >0
        //returns str if str.len <len
        if (str.length > len && str.length>0){
            let newStr = str.slice(0,len);
            newStr = newStr.substr(0,newStr.lastIndexOf(' '))+' ...'
            return newStr
        }else {
            return str
        }
    },
    stripTags: function(input){
        //strips all tags from input str
        let retInput = input.replace(/<(?:.|\n)*?>/gm,'');

        return retInput.replace(/&nbsp;/gm,'\n');
    },
    formatDate: function (date,format) {
        return moment(date).format(format)
    },
    select: function(selected, options){
        return options.fn(this).replace(new RegExp(' value=\"'+selected+'\"'),
            '$&selected="selected"').replace(new RegExp('>' + selected +'</option>'),
            'selected="selected"$&')
    },
    editIcon: function(storyUser,loggedUser,storyId,floating=true){
        if(storyUser == loggedUser){
           if(floating){
               return (`<a href="/stories/${storyId}/edit" class="btn-floating halfway-fab"><i class="fa fa-pencil"></i></a>`)
           } else {
               return `<a href="/stories/${storyId}/edit"><i class="fa fa-pencil"></i></a>`
           }
        } else {
            return ``
        }
    }
}