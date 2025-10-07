        // Dados dos escritórios (substitua pelas coordenadas reais)
        const offices = [
            {
                name: "Escritório Campos dos Goytacazes - RJ",
                address: "Praça São Salvador, 41 Loja 6 - Rio de Janeiro, RJ",
                phone: "(22) 99925-2211",
                email: "pessoa_adv@yahoo.com.br",
                lat: -21.756202,
                lng: -41.323076
            },
            {
                name: "Escritório Irajá RJ",
                address: "R. Menezes Prado, 94 - Irajá, RJ",
                phone: "(21) 97559 - 4646",
                email: "pessoa_adv@yahoo.com.br",
                lat: -22.8253691,
                lng: -43.3314418
            }
            /*{
                name: "Escritório Brasília",
                address: "SCS Quadra 1 - Brasília, DF",
                phone: "(61) 3000-0000",
                email: "blablabla@algumprovedor.com.br",
                lat: -15.7942,
                lng: -47.8822
            },
            {
                name: "Escritório Belo Horizonte",
                address: "Av. Afonso Pena, 1500 - BH, MG",
                phone: "(31) 3000-0000",
                email: "blablabla@algumprovedor.com.br",
                lat: -19.9167,
                lng: -43.9345
            } */
        ];
        
        // Inicializar o mapa centralizado no Brasil
        const map = L.map('map').setView([-15.7942, -47.8822], 4);
        

        // força o mapa a recalcular o tamanho
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        // Adicionar camada de tiles do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Ícone customizado dourado
        const goldIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEMxMC40OSAwIDYgNC40OSA2IDEwYzAgNS4yNSAxMCAxOCAxMCAxOHMxMC0xMi43NSAxMC0xOGMwLTUuNTEtNC40OS0xMC0xMC0xMHptMCAxNGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6IiBmaWxsPSIjYzlhODZhIi8+PC9zdmc+',
            iconSize: [32, 48],
            iconAnchor: [16, 48],
            popupAnchor: [0, -48]
        });
        
        // Adicionar marcadores para cada escritório
        offices.forEach(office => {
            const marker = L.marker([office.lat, office.lng], { icon: goldIcon }).addTo(map);
            
            // Criar popup
            const popupContent = `
                <h3>${office.name}</h3>
                <p><strong>Endereço:</strong><br>${office.address}</p>
                <p><strong>Telefone:</strong> ${office.phone}</p>
                <p><strong>Email:</strong> ${office.email}</p>
            `;
            
            marker.bindPopup(popupContent);
        });
        
        // Criar lista de escritórios
        const officesList = document.getElementById('offices-list');
        offices.forEach((office, index) => {
            const card = document.createElement('div');
            card.className = 'office-card';
            card.innerHTML = `
                <h3>${office.name}</h3>
                <p>${office.address}</p>
                <p class="phone">${office.phone}</p>
                <p class="phone">${office.email}</p>
            `;
            
            // Ao clicar no card, centralizar no mapa e abrir popup
            card.addEventListener('click', () => {
                map.setView([office.lat, office.lng], 15);
                // Encontrar o marcador correspondente e abrir seu popup
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        const latlng = layer.getLatLng();
                        if (latlng.lat === office.lat && latlng.lng === office.lng) {
                            layer.openPopup();
                        }
                    }
                });
            });
            
            officesList.appendChild(card);
        });
