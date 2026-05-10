# Horse Racing Game

Insider One Frontend Developer Assessment projesi. Vue 3 + Pinia ile geliştirilmiş, 6 turlu interaktif at yarışı oyunu.

## Kurulum

```bash
npm install
npm run dev
```

## Nasıl Oynanır

1. **GENERATE PROGRAM** butonuna bas — 20 at rastgele oluşturulur, 6 turlu program hazırlanır
2. **START** butonuna bas — turlar sırayla otomatik koşulur
3. Her tur bittikten sonra sonuçlar sağ panelde görünür
4. İstediğin anda **PAUSE** / **RESUME** yapabilirsin

## Stack

- **Vue 3** (Composition API + `<script setup>`)
- **Pinia** — state yönetimi
- **TypeScript**
- **Vitest** + **@vue/test-utils** — unit & visual testler
- **Cypress** — E2E testler

## Proje Yapısı

```
src/
├── types/          # TypeScript arayüzleri (Horse, Round, RaceResult, GameStatus)
├── constants/      # Oyun sabitleri (tur sayısı, mesafeler, at isimleri/renkleri)
├── stores/
│   ├── horses.ts   # At listesi — üretme ve rastgele seçim
│   └── race.ts     # Oyun akışı — program, yarış döngüsü, pause/resume
├── utils/
│   └── raceEngine.ts  # Yarış simülasyonu — hız hesabı ve animasyon süreleri
└── components/
    ├── HorseList/  # Sol panel — 20 atın listesi
    ├── RaceTrack/  # Orta panel — pist ve at animasyonları
    │   └── HorseLane.vue  # Tek şerit + CSS animasyonu
    ├── Program/    # Sağ üst — yarış programı
    └── Results/    # Sağ alt — tur sonuçları
```

## Yarış Simülasyonu

Her tur için her atın hız skoru hesaplanır:

```
hız = 0.45 + (kondisyon / 100) × kondisyonAğırlığı + rastgele(0..0.1)
kondisyonAğırlığı = 0.35 + (mesafe - 1200) / 5000
```

Kısa mesafelerde (1200m) şans faktörü daha belirleyici, uzun mesafelerde (2200m) kondisyon öne çıkar. Kazanan her zaman 5 saniyede bitirir; diğer atların animasyon süresi bu referansa göre orantısal hesaplanır.

## Testler

```bash
npm run test:unit    # Store ve utility testleri (28 test)
npm run test:visual  # Component render testleri (26 test)
```

```bash
# E2E — önce build gerekli
npm run build
npm run test:e2e
```

| Kategori | Araç | Adet |
|----------|------|------|
| Unit | Vitest | 28 |
| Visual (component snapshot) | Vitest + @vue/test-utils | 26 |
| E2E | Cypress | 11 |
