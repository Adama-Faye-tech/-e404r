<div align="center">

```
  ███████╗██╗  ██╗███████╗ ██████╗ ██████╗ 
  ██╔════╝██║  ██║██╔════╝██╔═══██╗██╔══██╗
  █████╗  ███████║███████╗██║   ██║██████╔╝
  ██╔══╝  ╚════██║╚════██║██║   ██║██╔══██╗
  ███████╗     ██║███████║╚██████╔╝██║  ██║
  ╚══════╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
```

**E404R - Engine 404 Router**

_Routeur IA GRATUIT et Sauvegardeur de Jetons (Token Saver)_

Ne vous arrêtez jamais de coder. Économisez 20 à 40 % de tokens avec RTK + profitez d'un système de secours (fallback) automatique vers des modèles d'IA gratuits et peu coûteux.

Connectez tous vos outils de code IA (Claude Code, Cursor, Antigravity, Copilot, Codex, Gemini, OpenCode, Cline, OpenClaw...) à **40+ fournisseurs IA** et **100+ modèles**.

</div>

---

## 🤔 Pourquoi E404R ?

Arrêtez de gaspiller de l'argent, des tokens et de subir des limites :
- ❌ Vos quotas d'abonnements expirent sans être utilisés à la fin du mois
- ❌ Les limites de requêtes (rate limits) vous stoppent en plein codage
- ❌ Les sorties d'outils CLI (git diff, grep, ls...) brûlent vos tokens à vitesse grand V
- ❌ Les API sont coûteuses (20-50 $/mois par fournisseur)
- ❌ La commutation manuelle entre les fournisseurs est fastidieuse

**E404R règle tous ces problèmes :**
- ✅ **RTK Token Saver** : Auto-compression du contenu `tool_result`, économisant 20 à 40 % de tokens par requête.
- ✅ **Maximisation des abonnements** : Suivi des quotas, pour utiliser chaque crédit avant sa réinitialisation.
- ✅ **Fallback automatique (Secours)** : Bascule intelligente Abonnement → Pas cher → Gratuit. Aucune interruption.
- ✅ **Multi-comptes** : Round-robin (répartition de charge) entre plusieurs comptes pour un même fournisseur.
- ✅ **Universel** : Fonctionne avec Claude Code, Codex, Cursor, Cline, ou n'importe quel outil CLI compatible OpenAI.

---

## 🔄 Comment ça fonctionne

```text
┌─────────────┐
│  Votre CLI  │  (Claude Code, Codex, OpenClaw, Cursor, Cline...)
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────────┐
│           E404R (Smart Router)              │
│  • RTK Token Saver (réduction des tokens)   │
│  • Traduction de formats (OpenAI ↔ Claude)  │
│  • Suivi des quotas en temps réel           │
│  • Rafraîchissement automatique des tokens  │
└──────┬──────────────────────────────────────┘
       │
       ├─→ [Niveau 1: ABONNEMENT] Claude Code, Codex, GitHub Copilot
       │   ↓ quota épuisé
       ├─→ [Niveau 2: PAS CHER] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ limite de budget
       └─→ [Niveau 3: GRATUIT] Kiro, OpenCode Free, Vertex ($300 crédits)
```
**Résultat :** Ne vous arrêtez jamais de coder. Coût minimal + 20-40% d'économies de tokens grâce à RTK.

---

## ⚡ Démarrage rapide

**1. Installation**
```bash
npm install -g e404r
e404r
```
🎉 Le tableau de bord s'ouvre sur `http://localhost:20128`

**2. Connectez un fournisseur GRATUIT (sans inscription requise)**
Dans le Dashboard, allez dans **Providers** → Connectez *Kiro AI* (~50 crédits/mois gratuits : Claude 4.5 + GLM-5 + MiniMax) ou *OpenCode Free* (sans authentification).

**3. Utilisez E404R dans votre outil CLI (ex: Claude Code / Cursor)**
Paramétrez votre outil avec :
- **Endpoint:** `http://localhost:20128/v1`
- **API Key:** `[copiez la clé depuis le dashboard E404R]`
- **Model:** `kr/claude-sonnet-4.5`

C'est tout ! Vous codez maintenant avec des modèles d'IA gratuits.




<img width="1352" height="606" alt="image" src="https://github.com/user-attachments/assets/e2cecffd-9979-4080-a1c0-814f66e0d9af" />


---

## 💡 Fonctionnalités Clés

| Fonctionnalité | Ce que ça fait | Pourquoi c'est important |
|---|---|---|
| 🚀 **RTK Token Saver** | Compresse les sorties d'outils CLI avant l'envoi au LLM. | Économisez **20-40%** de tokens d'entrée. |
| 🧠 **Headroom Token Saver** | Proxy externe optionnel avant le routage. | Sauvegardez plus de tokens contextuels. |
| 🪨 **Mode Homme des Cavernes** | Injecte une consigne stricte pour des réponses très brèves. | Économisez jusqu'à **65%** de tokens de sortie. |
| 🐴 **Queue de cheval (Ponytail)** | Injecte l'invite "lazy senior dev" (code minimal, YAGNI). | Moins de tokens, moins de refactoring. |
| 🎯 **Fallback à 3 Niveaux** | Routage auto : Abonnement → Pas cher → Gratuit. | **Zéro temps d'arrêt**, codage continu. |
| 🔄 **Traduction de format** | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro ↔ Vertex. | Universel, compatible partout. |

---

## 💰 Comprendre les coûts et la facturation

**La réalité d'E404R :**
- ✅ Le logiciel **E404R est 100% GRATUIT et Open Source**.
- ✅ Les "coûts" affichés sur le dashboard sont purement **informatifs** (estimation de ce que vous auriez payé sans E404R).
- ✅ Les fournisseurs gratuits restent gratuits (Kiro, OpenCode Free, Vertex $300).
- ❌ **E404R ne vous facturera jamais rien.**

### Exemples de Combos (Cas d'usage)

**Cas 1 : "Je veux que ce soit 100% gratuit"**
Combo "free-forever" :
1. `kr/claude-sonnet-4.5` (Claude 4.5 gratuit via Kiro)
2. `kr/glm-5` (GLM-5 gratuit via Kiro)
3. `oc/<auto>` (OpenCode Free)
*Coût mensuel : 0$*

**Cas 2 : "Je veux coder 24/7 sans interruption"**
Combo "always-on" :
1. `cc/claude-opus-4-7` (Le meilleur, via abonnement)
2. `cx/gpt-5.5` (2ème abonnement de secours)
3. `glm/glm-5.1` (Backup pas cher, reset quotidien)
4. `kr/claude-sonnet-4.5` (Gratuit, ultime secours)
*Résultat : Zéro temps mort.*

---

## 🛠️ Outils CLI et Fournisseurs pris en charge

**Outils CLI :** Claude Code, OpenClaw, Codex, OpenCode, Cursor, Antigravity, Cline, Continue, Droid, Roo, Copilot, Kilo Code.

**Fournisseurs OAuth :** Claude Code, Antigravity, Codex, GitHub, Cursor, Kimchi.

**Fournisseurs Gratuits :**
- **Kiro AI :** Claude 4.5, GLM-5, MiniMax (50 crédits/mois gratuits)
- **OpenCode Free :** Pas d'authentification requise.
- **Vertex AI :** Gemini 3 Pro, DeepSeek (300$ de crédits gratuits GCP)

**Fournisseurs via Clé API (40+) :** OpenRouter, GLM, Kimi, MiniMax, OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA, SiliconFlow...

---

## 💻 Développement et Docker

**Lancer avec Docker :**
```bash
docker run -d --name e404r -p 20128:20128 -e JWT_SECRET=votre-secret e404r/gateway
```

**Développement local :**
```bash
cp .env.example .env
npm install
npm run dev
```

---

## 🙏 Remerciements et Crédits

Construit sur les épaules de géants. D'énormes remerciements aux créateurs de :
- **CLIProxyAPI** : Implémentation originale en Go.
- **RTK Stars** : Pipeline de compression de tokens.
- **Caveman Stars** (@JuliusBrussee) : Prompting "Homme des cavernes" pour réduire l'output.
- **Ponytail Stars** (@DietrichGebert) : Mode "Lazy senior dev".

Sans leurs travaux fondamentaux, les fonctionnalités d'E404R n'existeraient pas. Pensez à mettre une étoile (⭐) sur leurs dépôts !

---

<div align="center">
<b>Construit avec ❤️ pour les développeurs qui codent H24.</b><br>
Licence MIT
</div>
