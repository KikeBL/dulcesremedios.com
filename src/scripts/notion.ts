import { Client } from "@notionhq/client";

export type cake = {
    producto: string;
    excerpt: string;
    description: string;
    tags: string[];
    cover: string;
    rename: string;
    price: number;
    allergens: string[];
};

export async function getAllProducts(): Promise<cake[]> {
    const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
    
    //NOTE - Listado de tartas
    const pages = await notion.databases.query({
        database_id: import.meta.env.NOTION_PRODUCTOS_DATABASE_ID,
        // Add a filter here.
        filter: {
            property: "Disponible en",
            multi_select: {
                contains: "Web"
            }
        }
    });

    //NOTE - Response formatter
    const events = pages.results
        .map((page) => {
            return {
                id: page.id,
                producto: page.properties.Producto.title[0].plain_text,
                excerpt: page.properties.Excerpt.rich_text[0] ? page.properties.Excerpt.rich_text[0].plain_text : "",
                categorias: page.properties.Categoria.multi_select.map((x) => { return x.name }),
                cover: page.cover ? (page.cover.external ? page.cover.external.url : page.cover.file.url) : null,
                rename: page.properties.Rename.rich_text[0] ? page.properties.Rename.rich_text[0].plain_text : "",
                price: page.properties["PVP Mercadillo"] ? page.properties["PVP Mercadillo"].number : "Consultar",
                allergens: page.properties.Allergens.multi_select.map((x) => { return x.name }),

            };
        })
    
    return events
}

//TODO - Detalle de una tarta