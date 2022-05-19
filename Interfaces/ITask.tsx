


export default interface ITask {
    id:number, 
   dateCompleted:string,
    dateCreated: string,
    isArchived:boolean, 
    isDeleted:boolean,
    task: {
        id: number,
        name: string,
        description: string,
        tags: string,
        time:string,
        coins:number
        
    },
    item:{
        id: number,
        name: string,
        description: string,
        tags: string,
       
    }

  }