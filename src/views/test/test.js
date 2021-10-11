if(!net[data[1]]){
  net[data[1]]=[net[data[0]]]
}else{
  net[data[1]].push(net[data[0]])
}
if(net[head].indexOf(tail)===-1){
  net[head].forEach(v=>{
    if(net[v].indexOf(tail)===-1){
      net[v].forEach(x=>{
        if(net[x].indexOf(tail)===-1){

        }else{
          length=3
        }
      })
    }else{
      length=2
      break
    }
  })
}else{
  length = 1
}
