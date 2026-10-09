# Fontes da marca

As fontes **ABC Arizona** (ABC Dinamo) são licenciadas e **não estão neste repositório**.
Coloque os arquivos abaixo nesta pasta antes de rodar o projeto:

| Arquivo | Uso |
| --- | --- |
| `ABCArizonaFlare-Regular.otf` | Títulos e textos Flare de **24px ou menos** |
| `ABCArizonaFlare-Light.otf` | Títulos e textos Flare **acima de 24px** |
| `ABCArizonaSans-Regular.otf` | Texto corrido, UI e legendas |

`ABCArizonaSerif-Bold.otf` pode ficar aqui, mas a homepage não a utiliza.

Os arquivos são registrados em `src/fonts.ts`. A regra Light/Regular fica em `src/theme.ts`
(`FLARE_LIGHT_ABOVE` e `flareFor`).
