export interface Product
{
    id:number;
    Titre:string;
    Description:string;
    Genre:string;
    Prix:number;
    Couleur:string;
    Confid:string;
    Condition:number;
    ImageName:string;
    article:{id:number,Prix:number,Genre:string, ImageName:string;};
    categorie:{name:string,id:number};
    sscategorie:{name:string,id:number};
    article_id:number;

}