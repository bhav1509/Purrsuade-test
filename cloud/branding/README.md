# Sign-in page branding

Makes Cognito's sign-in page match the app: dark purple, lavender buttons, the paw logo and a pixel night sky. Cognito
can't use the pixel font or change the layout, so the page matches the app's look but isn't identical.

| File | Where it goes |
|---|---|
| `logo.png` | Form logo (the paw, 192 × 192) |
| `favicon.svg` | Favicon (SVG) |
| `background.svg` | Page background image (made by `scripts/make-login-background.mjs`) |

Do it on the **test** pool first, check it, then the **live** pool.

## 1. Open the editor
1. AWS Console → **Cognito** (Sydney) → the user pool:
   - **Test:** the pool from stack `purrsuade-test`
   - **Live:** the pool behind `ap-southeast-2k4xfr0rzy`
2. Left menu → **Branding** → **Managed login**.
3. Under **Styles**:
   - **If the app client already has a style** (the test pool does): select it, then **Edit**.
   - **If not:** choose **Create a style**, pick the app client, then **Create**.
4. The branding editor opens.

## 2. Settings
Leave anything not listed at its default.

**Foundation**
| Setting | Value |
|---|---|
| Display mode | **Dark** |
| Spacing | Regular |
| Border radius | ~12 px (or "Rounded") |

**Components**
| Component | Setting | Value |
|---|---|---|
| Page background | Image | upload `background.svg` |
| | Colour | `#15121e` |
| Form container | Background | `#221c32` |
| | Border | `#120e1b` |
| | Logo | upload `logo.png`, position **centre, top** |
| Buttons, primary | Background | `#b4a2ff` (hover `#c6b6ff`, active `#8f7ae6`) |
| | Text | `#1d1830` |
| Buttons, secondary | Background | `#2f2843` |
| | Text and border | `#f3eefc` / `#40375a` |
| Inputs | Background | `#241e35` |
| | Border | `#40375a` (focus `#b4a2ff`) |
| | Text / placeholder | `#f3eefc` / `#b3abc8` |
| Text for page and field | Heading / body | `#f3eefc` / `#b3abc8` |
| Link | Colour | `#b4a2ff` (hover `#d6c9ff`) |
| Focus rings | Colour | `#b4a2ff` |
| Favicon | SVG | upload `favicon.svg` |
| Global header / footer | | off |

## 3. Save and check
1. **Save changes**. It goes live within about a minute.
2. Open the app (test site first) → Settings → **Sign in with email**, and check the page on the laptop and the
   iPhone.
3. Repeat on the live pool.

**Note (test pool):** the test stack's template says "use Cognito's default style", but a console edit stays unless
that resource is replaced. If a later `deploy-test-backend.sh` run resets it, the settings can go into
`cloud/template.yaml` (`ManagedLoginBranding` → `Settings` and `Assets`).
