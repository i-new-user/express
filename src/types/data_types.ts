export type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: Number | null
    createdAt: string
    publicationDate: string
    availableResolution: ResolutionsType
}
export type ResolutionsType = Array<string>

export type UpdateVideoInputModelType = {
    
    title: string
    author: string
    availableResolution: ResolutionsType
    canBeDownloaded: boolean
    minAgeRestriction: Number | null
    publicationDate: string
}

export type CreateVideoInputModelType = {
    title: string
    author: string
    availableResolution: ResolutionsType
}

export type FieldErrorType = {
    message: string
    field: string
}

export type APIErrorResultType ={
    errorsMessages: Array<FieldErrorType>
        
}