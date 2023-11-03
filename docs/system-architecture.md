# System Architecture

## Technical Architecture

### UI Mockup

[UI Mockup](https://www.figma.com/file/oYauSht0DlFIqSQ63mDb90/Lofi-Wireframes?type=design&node-id=94-3012&mode=design&t=x9vkl0FoNuTQQh3J-0)

### Technologies

#### Web Framework

- React (TypeScript)
- Jest (TypeScript) + Testing React
- React Router
- Redux (If necessary)
- Tailwind CSS
- Icons: https://lucide.dev/

#### Web Backend

- Firebase
  - Firestore
  - Cloud Storage
  - Firebase Authentication (to create Admin credentials)

#### Deployment

- Firebase Hosting
- Look into Netlify (better for dynamic website)

#### Custom Backend (Admin Console)

- Firebase Cloud Function (if necessary for compressing media)

### Solution Architecture

#### Inline Mermaid Diagram

You can map this inline if you want (my preferred way)

```mermaid
flowchart TD
subgraph D["Firebase"]
    D1["Cloud Storage"]
    D2["Cloud Firestore"]
end
subgraph A["Admin Site"]
    subgraph B["Routes"]
        B1["Auth"]
        B2["Dashboard"]
        B3["Member"]
    end
    subgraph C["Reach Context"]
        C1["Auth"]
        C2["Members"]
        C3["Media"]
    end
end
B1 --> C1
B2 --> C2
B2 --> C3
B3 --> C3
B3 --> C2
C1 --> D2
C2 --> D2
C3 --> D1
```

#### Mermaid Editor Link

You can also link to the mermaid editor

[![](https://mermaid.ink/img/pako:eNptkj1vgzAQhv-K5TkZgI2hEmB1y1I6te5w4Euwim1kbLVVlP_ec5AgqPVgvb7n7l5_XXnvFPKSn0f31Q_gA3sV0s6xu3iYBibeJX_WHjuYUfIPaRkNkVG0GV1UrA3Ow-UB5StKZTPhBaJVD20ryqqU0Za1OmzVK6-Jv7gYcF5ZGnUyrmIY9tHkKWAeOgde7VFB6ISmQ7_G7zvZuTXJDaEn5WzA77Dr0fxr2uRr5_0em8VSadg73qc6Y8fjE7UkmS8y32RBsvgjKaFZykSS-SaXBJHxAzfoDWhFD3lNnpKHAQ1dbElSgf-UXNob5UEMrv2xPS-Dj3jgcVIQUGigmzC8PMM4U3QC--bctqbT0EOelp9y_zC3XyHKqsw?type=png)](https://mermaid.live/edit#pako:eNptkj1vgzAQhv-K5TkZgI2hEmB1y1I6te5w4Euwim1kbLVVlP_ec5AgqPVgvb7n7l5_XXnvFPKSn0f31Q_gA3sV0s6xu3iYBibeJX_WHjuYUfIPaRkNkVG0GV1UrA3Ow-UB5StKZTPhBaJVD20ryqqU0Za1OmzVK6-Jv7gYcF5ZGnUyrmIY9tHkKWAeOgde7VFB6ISmQ7_G7zvZuTXJDaEn5WzA77Dr0fxr2uRr5_0em8VSadg73qc6Y8fjE7UkmS8y32RBsvgjKaFZykSS-SaXBJHxAzfoDWhFD3lNnpKHAQ1dbElSgf-UXNob5UEMrv2xPS-Dj3jgcVIQUGigmzC8PMM4U3QC--bctqbT0EOelp9y_zC3XyHKqsw)

### Entity Relationship Diagram

#### Inline Mermaid Diagram

You can map this inline if you want (my preferred way)

```mermaid
erDiagram
    Admin {
        int adminId PK
        encryptedString password 
    }
    Member {
        int memberId PK
        string name
        encryptedString passcode
        enum theme
        url avatar
    }
    Media {
        int mediaId PK
        url mediaUrl
        string text
        int sizeX
        int sizeY
        enum type
    }
    Member }|--o{ Media : has
```

#### Mermaid Editor Link

You can also link to the mermaid editor

[![](https://mermaid.ink/img/pako:eNp9ks1OwzAMx18l8nl7gdyQuCA0CWlCgqkX05gtovmQ4wCl9N1Jm0kbLcKXxH_545fYA7TBEGggvrV4ZHSNV8VujLNeDdWZzHpROIl3Rj3cX3TyLfdRyOyFrT-qiCl9BDaqhoz12JF7IV7Wc7O6KJhqHY-O_u8ygV9HZKfkRNdZmTuF7yjICxhjcc1SxAXKlD_rj9ytAIU-5XeJZL_oaS09LyH7SH99zvi93YbhTKfVCRNswBE7tKYMaOZtoD4RdLka5LcGGj-WOMwS9r1vQQtn2kCOBoXOIwX9il0qakR_COHil1YSeFc3YF6E8QfQnaIK?type=png)](https://mermaid.live/edit#pako:eNp9ks1OwzAMx18l8nl7gdyQuCA0CWlCgqkX05gtovmQ4wCl9N1Jm0kbLcKXxH_545fYA7TBEGggvrV4ZHSNV8VujLNeDdWZzHpROIl3Rj3cX3TyLfdRyOyFrT-qiCl9BDaqhoz12JF7IV7Wc7O6KJhqHY-O_u8ygV9HZKfkRNdZmTuF7yjICxhjcc1SxAXKlD_rj9ytAIU-5XeJZL_oaS09LyH7SH99zvi93YbhTKfVCRNswBE7tKYMaOZtoD4RdLka5LcGGj-WOMwS9r1vQQtn2kCOBoXOIwX9il0qakR_COHil1YSeFc3YF6E8QfQnaIK)

### Sequence Diagram

#### Inline Mermaid Diagram

You can map this inline if you want (my preferred way)

```mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
```

#### Mermaid Editor Link

You can also link to the mermaid editor

[![](https://mermaid.ink/img/pako:eNptkL0KAjEMgF8lZvXuBW5QBAcVnNykS2ijV2wbrS0i4rubu9PNTPn5vkDyQiuOscM73yony2tP50zRJNBYBW-5XSzmO-lTBxsOQWDIG-jlAZQZnlKXf-EJs5QGBHqmDJG_6DBrFW1HRxf7yW5gOxojrdrsP76FE3OAc2YqM2wwco7knV7xGgSDpefIBjtNHeWLQZPeylEtcngmi13JlRusV0fld_GveaV0FNHyROGuNTtfJO-nL43Pen8Afy9jnw?type=png)](https://mermaid.live/edit#pako:eNptkL0KAjEMgF8lZvXuBW5QBAcVnNykS2ijV2wbrS0i4rubu9PNTPn5vkDyQiuOscM73yony2tP50zRJNBYBW-5XSzmO-lTBxsOQWDIG-jlAZQZnlKXf-EJs5QGBHqmDJG_6DBrFW1HRxf7yW5gOxojrdrsP76FE3OAc2YqM2wwco7knV7xGgSDpefIBjtNHeWLQZPeylEtcngmi13JlRusV0fld_GveaV0FNHyROGuNTtfJO-nL43Pen8Afy9jnw)