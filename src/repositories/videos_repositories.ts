


export let videos = [
    {
        id: 1,
        title: "Ocean",
        author: "it-incubator",
        canBeDownloaded: false,
        minAgeRestriction:  null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
        availableResolutions: ["P144"]
     }
]


export const videosRepository = {

     findAllVideos(title: string | null | undefined){
       if(title){
        let filterVideo = videos.filter(v => v.title.indexOf(title) > -1)
        return filterVideo;
       }else{
        return videos;
       }
    },

    findVideosById(id: number){
       let video = videos.find(v => v.id === id)
       return video;
    },

    createVideo(title: string, author: string){
        const newVideo = {
            id: 1,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction:  null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date( new Date().setDate(new Date().getDate() + 1) ).toISOString(),
            availableResolutions: ["P144"]
        }
        videos.push(newVideo)
        return newVideo
    },

    updateVideosById(id: number, title: string, author: string){
        let video = videos.find(v => v.id === id)
        if (video) {
        
            video.title = title;
            video.author = author;
          
            return true;
        } else {
            return false
        }
        
    },
    deleteVideosById(id: number){
       for(let i = 0; i < videos.length; i++){
        if(videos[i].id = id){
            videos.splice(i,1)
            return true;
        }
       }
       return false;
    }
     

}