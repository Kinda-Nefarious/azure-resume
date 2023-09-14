# Azure Resume Website

A Blazor static website with a .NET 6 serverless backend that provides crypto price information. The tickers update every in realtime whenever new data is made available to the database.

This project contains two different architectures and was made to demo how to implement real-time functionality to a static site.

View it live [here.](https://resume.rufaronyakudya.com/)


## Architecture


## Run locally 

You can clone the code and the resume can be accessed through index.html

### Install

- [.NET 6](https://dotnet.microsoft.com/download)
- All the pre requisites from [this documentation](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code?tabs=csharp)

### Debug

I've created custom [VSCode Launch.json](https://code.visualstudio.com/docs/editor/debugging) tasks. Make sure the API is running before you run the Client.

- Use `Attach to .NET Functions` to debug the API.
- Use `(Starter) Launch and Debug Standalone Blazor WebAssembly App` to debug the starter Client project.
- Use `(Completed) Launch and Debug Standalone Blazor WebAssembly App` to debug the Completed Client project.

## Steps to go from starter to completed.

If you want to take the starter project and implement real-time functionality on your own to learn and get hands-on, here are some guidelines:

### API

Some docs I found helpful:

- [Build real-time Apps with Azure Functions and Azure SignalR Service](https://learn.microsoft.com/azure/azure-signalr/signalr-concept-azure-functions)
- [Connect Azure Functions to Azure Cosmos DB using Visual Studio Code](https://learn.microsoft.com/azure/azure-functions/functions-add-output-binding-cosmos-db-vs-code?tabs=in-process&pivots=programming-language-csharp)
- [How to deploy a Blazor WASM app to Azure Storage](https://microsoft.github.io/AzureTipsAndTricks/blog/tip221.html)

0. Get a [Coin Gecko API key](https://www.coingecko.com/en/api)
1. Create necessary Azure Resources:
    - Resource Group
    - Cosmos DB account (my project uses NoSQL API but you can adapt to any)
        - Cosmo DB collection and Database
    - SignalR Service
2. Create a class that will describe your object. Mine is `Shared/Coin.cs`
3. Create an Azure Function with TimerTrigger. I set mine to 60 seconds but you can adjust the occurrence to whatever. Mine is `GetCryptoPrices.cs` 
    - Populate your `local.settings.json` with appropriate connection strings, collection names, etc. 
    - This Function should make Coin Gecko GET API call, send data to Cosmos DB collection and to the SignalR service hub.
4. Create an Azure Function with HTTPTrigger that will act as the SignalR negotiate. Mine is `negotiate.cs`
5. Create an Azure Function with HTTPTrigger that will connect to your Cosmos DB Database and Collection and return the data in said collection as json. This you can use for first time data loading in Client. Mine is `GetPricesJson.cs`

### Client

1. Create a razor component that will display your Tickers. Mine is `Pages/Tickers.razor`
2. My project has the `Pages/fetchdata.razor` component load the `Pages/Ticker.razor` component so my logic is in `fetchdata.razor.cs`. You'll have to add code that will:
    - load the json from your HTTP Function `GetJsonPrices.cs` for first time data load.
    - Connect to the SignalR Service hub
    - Loads new data from SignalR Service hub. I've done this in `fetchdata.razor.cs` component.

#### Client UI

I'm using [MudBlazor](https://mudblazor.com/) for Client UI components, it's awesome. 


## Known issues

- I've included a `devcontainer.json` for codespaces and devcontainer support, however it's not fully working quite yet. WIP.
- CI/CD is coming. At the moment the client is deployed on Azure Storage Account. 
- Code has been updated to .NET 6 but is probably not fully taking advantage of the latest and greatest.
- Tests are WIP.

## Further Work

This demo is a spin on this learning module, check it out for more hands-on fun! https://aka.ms/UpdateWebApp6

## License
Licensed under MIT License.