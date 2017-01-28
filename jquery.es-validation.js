/* Essence Validation
copyright 2017, Essence Webservice Ryo Inagaki
http://essencews.com
https://ryo0702.github.io/essence-validation/
released under the MIT license
*/

;(function($) {
  $.fn.esvalidation = function(options) {

    function validation_required(this_elem,check_array){

      if($(this_elem).hasClass("name")){
        var input_0 = $(this_elem).find("input:eq(0)").attr("name");
        var input_1 = $(this_elem).find("input:eq(1)").attr("name");
        check_array[input_0] = check_array[input_1] = {};
      }
      if($(this_elem).hasClass("year-month-day")){
        var input_0 = $(this_elem).find("select:eq(0)").attr("name");
        var input_1 = $(this_elem).find("select:eq(1)").attr("name");
        var input_2 = $(this_elem).find("select:eq(2)").attr("name");
        check_array[input_0] = check_array[input_1] = check_array[input_2] = {};
      }
      else{
        var this_selector = $(this_elem).find(".form > input,.form > textarea,.form > select");
        var input_name = $(this_selector).attr("name");
        check_array[input_name] = {};
      }

      if($(this_elem).hasClass("require")){
        if($(this_elem).hasClass("name")){
          if(is_empy($(this_elem).find("input:eq(0)").val())){check_array[input_0]["empty"] = "empty";}
          else{check_array[input_0]["empty"] = "";}
          if(is_empy($(this_elem).find("input:eq(1)").val())){check_array[input_1]["empty"] = "empty";}
          else{check_array[input_1]["empty"] = "";}
        }
        else if($(this_elem).hasClass("year-month-day")){
          if(is_empy($(this_elem).find("select:eq(0)").val())){check_array[input_0]["empty"] = "empty";}
          else{check_array[input_0]["empty"] = "";}
          if(is_empy($(this_elem).find("select:eq(1)").val())){check_array[input_1]["empty"] = "empty";}
          else{check_array[input_1]["empty"] = "";}
          if(is_empy($(this_elem).find("select:eq(2)").val())){check_array[input_2]["empty"] = "empty";}
          else{check_array[input_2]["empty"] = "";}
        }
        else{
          if(is_empy($(this_elem).find(this_selector).val())){check_array[input_name]["empty"] = "empty";}
          else{check_array[input_name]["empty"] = "";}
        }
      }
      if($(this_elem).hasClass("email")){
        if(!is_email($(this_elem).find(this_selector).val())){check_array[input_name]["email"] = "notemail";}
        else{check_array[input_name]["email"] = "";}
      }
      if($(this_elem).hasClass("tel")){
        if(!is_tel($(this_elem).find(this_selector).val())){check_array[input_name]["tel"] = "nottel";}
        else{check_array[input_name]["tel"] = "";}
      }
      return check_array;
    }

    function all_validation(check_array){
      var check = '';
      jQuery.each(check_array,function(check_name,check_val) {
        var this_val_check = '';
        if(!is_empy(check_val)){
          if(check_val["email"] == 'notemail'){this_val_check = 'no';}
          if(check_val["tel"] == 'nottel'){this_val_check = 'no';}
          if(check_val["empty"] == 'empty'){check = 'no';this_val_check = 'no';}
          if(this_val_check == 'no'){$("[name="+check_name+"]").parents(".form-group").addClass("input-warning");}
          else{$("[name="+check_name+"]").parents(".form-group").removeClass("input-warning");}
        }
        else{
          $("[name="+check_name+"]").parents(".form-group").removeClass("input-warning");
        }
      });

      if(check == 'no'){
        $("button.check,input[type='button'].check").prop("disabled",true);
      }
      else{
        $("button.check,input[type='button'].check").prop("disabled",false);
      }
    }

    var opts = $.extend({}, $.fn.esvalidation.defaults,options);
    var this_form = this;
    var check_array = {};

    var validations_class = ".form-group.require,.form-group.email,.form-group.tel";

    if($(this_form).find(validations_class).length){
      // Check
      jQuery.each($(this_form).find(validations_class),function() {
        $("button.check,input[type='button'].check").prop("disabled",true);
        if($(this).hasClass("require")){
          $(this).children(".title").append("<span style='color:#ff0000;margin-left:2px;font-weight:bold;'>*</span>");
          check_array = validation_required(this,check_array);
        }
        if($(this).hasClass("email")){
          $(this).children(".title").append("<span style='color:#ff0000;margin-left:2px;font-weight:bold;'>メールアドレス</span>");
        }
        if($(this).hasClass("tel")){
          $(this).children(".title").append("<span style='color:#ff0000;margin-left:2px;font-weight:bold;'>半角・ハイフンあり</span>");
        }
      });
      all_validation(check_array);

      // Change
      var this_selector = $(this_form).find(".form > input,.form > textarea,.form > select");
      $(document).on("change",this_selector,function(){
          jQuery.each($(this_form).find(validations_class),function() {
            check_array = validation_required(this,check_array);
          });
          all_validation(check_array);
      });
    }
  }

  $.fn.esvalidation.defaults = {
    speed: 150,
    position:"left"
  };
})(jQuery);
