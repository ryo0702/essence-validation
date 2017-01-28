function is_email(text){
  if(is_empy(text)){
    return false;
  }
  else if(text.match(/^[a-zA-Z0-9_.+-]+[@][a-zA-Z0-9.-]+$/) == null){
    return false;
  }
  else {
    return true;
  }
}

function is_tel(text){
  if(is_empy(text)){
    return false;
  }
  else if(text.match(/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/) == null){
    return false;
  }
  else {
    return true;
  }
}

function is_empy(text){
  if(text== '' || text== null){return true}
  else{return false;}
}

function is_max_chara(text,chara){
  if(is_empy(text)){
    return false;
  }
  else if(text.length <= chara) {
    return true;
  }
  else{
    return false;
  }
}

function is_min_chara(text,chara){
  if(is_empy(text)){
    return false;
  }
  else if(text.length >= chara) {
    return true;
  }
  else{
    return false;
  }
}
