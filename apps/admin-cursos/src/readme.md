# Admin do catálogo de cursos

## Api para cadastro e manutenção de cursos, experts, categorias, subcategorias e trilhas 


### Categorias
Categoria é a principal divisão entre os cursos. Elas representam a área de atuação do profissional 
que trabalha com aquele conteúdo. Sendo bem genéricas e abrangentes (como gastronomia ou artesanato, por exemplo),
dificilmente sofrerão alterações após o cadastro inicial. Categorias possuem um nome e um slug gerado 
automaticamente com ctg como prefixo.
```typescript
class Category {
  name: string
  slug: string
}
```

### Sub-Categorias
Ao contrário das categorias, sub-categorias já são mais específicas, representando um nicho daquela categoria 
(como feltro ou tricô, dentro de uma categoria de artesanato). Assim como as categorias, sub-categorias possuem
um slug com um prefixo próprio (sub_ctg) e um nome único, que transmite sua essência. Toda sub-categoria
necessariamente pertence a uma categoria, como seu próprio nome sugere.
```typescript
class SubCategory {
  name: string
  slug: string
}
```
### Experts
Os cursos não se produzem sozinhos. Existe uma equipe de experts por trás da execução e gravação de cada
curso, que podem ou não se especializar em determinada categoria. Logo, um expert pode produzir vários cursos
em diferentes áreas, sendo uma peça essencial para sua existência. Além disso, mais de um expert pode se juntar
para produzir um mesmo curso. Experts possuem um nome, uma descrição sobre sua carreira/experiência, e uma foto
para ser exibida com seu perfil. O avatar é salvo em um bucket por uma api externa, sendo armazenado apenas um link para seu repositório.o 
```typescript
class Expert {
  name: string
  about: string
  avatar?: string
}
```
### Cursos
O core desta api. Todas as entidades anteriormente definidas são utilizadas na criação de um curso. Todo curso 
pertence a uma área (categoria), podendo abranger um ou mais assuntos (sub-categorias), sendo produzido por um
ou mais experts. Os cursos possuem diversas aulas divididas em capítulos para uma melhor organização. Os cursos
possuem um título e uma descrição. Assim como categorias e sub-categorias, um curso pode ser identificado também 
por seu slug único gerado automaticamente a partir do seu título, que inicia sempre com o prefixo 'crs'.
Cada curso ainda possui uma thumbnail e um vídeo de preview que, assim como o avatar do expert, são links 
para um repositório externo. Por padrão, o curso estará disponível apenas para assinantes, mas é possível definí-lo
como gratuito para que qualquer aluno consiga acessá-lo. O cálculo de duração do curso é feito automaticamente conforme
novas aulas são cadastradas/atualizadas.

Depois que todas as aulas foram cadastradas e todas as outras informações de um curso foram preenchidas com sucesso, 
ele está pronto para ser publicado. Uma vez confirmado que não falta preencher mais nenhum campo, o curso estará 
disponível na data programada. É possível modificar qualquer propriedade do curso após sua publicação, o que
gerará uma nova versão e arquivará a versão atual. É possível restaurar uma versão anterior, ou partir dela 
para criar uma nova versão, contanto que não exista nenhuma propriedade inválida na hora de sua implantação.
```typescript
class Course {
  title: string
  slug: string
  description: string 
  categoryId: UniqueId
  expertsIds: [UniqueId]
  thumbnail: string 
  previewUrl: string 
  duration: number 
  subCategoriesIds: [UniqueId]
  isFree: boolean
  releaseDate: Date 
  chapters: [{ 
    title: string
    order: number
    lessons:[{
      title: string
      order: number
      video: string
      duration: number
    }]
  }]
}
```
