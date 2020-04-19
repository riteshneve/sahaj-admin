import { browserHistory } from "../configure-store";
export const browserHistoryPagePush = (url:string,queryParam: any,urlstate?:any) => {
  if (
    Object.keys(queryParam).includes("insurer") &&
    Object.keys(queryParam).includes("vertical")
  ) {
    let search = "?";
    Object.keys(queryParam).forEach((param:any, index:any) => {
      search += `${param}=${queryParam[param]}&`;
    });
    let state:any={}
    if(urlstate && Object.keys(urlstate))
    {
      Object.entries(urlstate).forEach((item:any,index:any)=>{
        state[item[0]]=item[1]
      })
    }    
    let slicedSearch=search.slice(0,search.length-1)
    browserHistory.push({
        pathname:url,
        search:slicedSearch,
        state:state
    })


  }
};
