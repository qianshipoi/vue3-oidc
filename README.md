# Vue 3 + OIDC + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

- [OIDC Server (damienbod/AspNetCoreOpeniddict)](https://github.com/damienbod/AspNetCoreOpeniddict)

- [OIDC Client (authts/oidc-client-ts)](https://github.com/authts/oidc-client-ts)

## OIDC Server Application Config

```C#
 if (await manager.FindByClientIdAsync("vueclient") is null)
 {
     await manager.CreateAsync(new OpenIddictApplicationDescriptor
     {
         ClientId = "vueclient",
         ConsentType = ConsentTypes.Explicit,
         DisplayName = "vue client PKCE",
         DisplayNames =
         {
             [CultureInfo.GetCultureInfo("fr-FR")] = "Application cliente MVC"
         },
         PostLogoutRedirectUris =
         {
             new Uri("https://localhost:5173"),
             new Uri("https://localhost:5173/logout-callback")
         },
         RedirectUris =
         {
             new Uri("https://localhost:5173/callback")
         },
         Permissions =
         {
             Permissions.Endpoints.Authorization,
             Permissions.Endpoints.Logout,
             Permissions.Endpoints.Token,
             Permissions.Endpoints.Revocation,
             Permissions.GrantTypes.AuthorizationCode,
             Permissions.GrantTypes.RefreshToken,
             Permissions.ResponseTypes.Code,
             Permissions.Scopes.Email,
             Permissions.Scopes.Profile,
             Permissions.Scopes.Roles,
             Permissions.Prefixes.Scope + "dataEventRecords"
         },
         Requirements =
         {
             Requirements.Features.ProofKeyForCodeExchange
         }
     });
 }
```
