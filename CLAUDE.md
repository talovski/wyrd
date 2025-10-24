# Wyrd: D&D Character Sheet Manager

## Project Overview
D&D 5e character sheet with safe leveling/respecing/multiclassing. 
Core feature: **undo/redo** to prevent character loss (D&D Beyond's main problem).

**Status:** New project, architecture phase

## Tech Stack
- Vite + SolidJS + TailwindCSS
- Biome (linting/formatting), Vitest (testing)
- No backend (localStorage only)
- No extra dependencies yet

## Core Data Model

### Character (minimal starting point)
```typescript
type Character = {
  id: string;
  name: string;
  level: number;
  classes: Record<string, number>;  // { "fighter": 3, "wizard": 2 }
  race: string;
  abilities: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  hp: {
    max: number;
    current: number;
  };
  experience: number;
  proficiencyBonus: number;  // Calculated from total level
};
```

Expand this as needed (equipment, spells, features). Start simple.

## Architecture

### History Pattern
```typescript
history: Character[]        // Immutable snapshots
currentIndex: number        // Pointer to current state
undo() → currentIndex--
redo() → currentIndex++
```

### Creating Snapshots
```typescript
const snapshot = structuredClone(character());
snapshot.level += 1;
appendToHistory(snapshot);
```

### Validation Pattern
Return errors, don't throw:
```typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

### D&D Rules = Data
All mechanics in JSON. No hardcoded class features or spell effects.

## File Structure

```
app/
├── core/                     # D&D business logic (pure TypeScript)
│   ├── character.ts          # Types + calculations (AC, HP, spell slots)
│   ├── operations.ts         # Level up, multiclass, respec
│   └── validation.ts         # D&D rules validation
├── stores/
│   └── character-store.ts    # History + undo/redo
├── components/
│   ├── ui/                   # Design system
│   │   ├── Button.tsx
│   │   ├── Dialog.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── CharacterSheet/
│   │   ├── CharacterSheet.tsx
│   │   ├── AbilityScores.tsx
│   │   └── Skills.tsx
│   ├── CreateWizard/
│   │   ├── CreateWizard.tsx
│   │   ├── RaceSelect.tsx
│   │   └── ClassSelect.tsx
│   ├── LevelUpWizard/
│   │   ├── LevelUpWizard.tsx
│   │   ├── ClassSelect.tsx
│   │   └── FeatureSelect.tsx
│   └── HistoryControls.tsx
├── lib/
│   ├── constants.ts          # MAX_LEVEL, MAX_HISTORY, etc.
│   └── storage.ts            # localStorage helpers
├── App.tsx
└── main.tsx

public/
├── data/                     # Static D&D data (committed to git)
│   ├── classes.json
│   ├── races.json
│   ├── features.json
│   ├── traits.json
│   └── spells.json

scripts/
├── fetchers/                 # Scripts to rebuild public/data
│   ├── fetch-dnd5eapi.ts
│   ├── fetch-open5e.ts
│   └── merge-data.ts
```

## Static Data Strategy

### Two APIs, One Merged Dataset
- **dnd5eapi.co** - Stats, mechanics, computable values
- **open5e.com** - Descriptions, flavor text

Both APIs use the same D&D 5e SRD ruleset. Data is **static** and served from `/public/data`.

### Merge Process
```typescript
// scripts/fetchers/merge-data.ts
const ID_MAP = {
  'fighter': 'fighter',
  'wizard': 'wizard',
  // Explicit mapping between API IDs
};

function mergeClasses(dndApi, open5e) {
  return dndApi.map(cls => ({
    id: cls.index,
    name: cls.name,
    hitDie: cls.hit_die,              // From dnd5eapi
    description: open5e[ID_MAP[cls.index]]?.desc || '',  // From open5e
    // ...
  }));
}
```

Run fetchers manually when:
- D&D publishes errata
- Adding new content (Tasha's, Xanathar's)
- API fixes bugs

**Version the data** - commit JSON to git, don't fetch at runtime.

### Data Files
- `classes.json` - Hit dice, proficiencies, features by level
- `races.json` - Ability bonuses, traits, size, speed
- `features.json` - Class features, ASI, feats
- `traits.json` - Racial traits (darkvision, etc.)
- `spells.json` - Level, school, components, descriptions

## Implementation Rules

### State Management
- SolidJS stores only (no Redux/Zustand)
- `structuredClone()` for snapshots
- Limit history to 50 checkpoints
- All snapshots must be JSON-serializable

### Checkpointing
**Save at:**
- Start of level-up wizard
- Completing operations (level-up, respec, multiclass)
- User clicks "Save checkpoint"

**Don't checkpoint:**
- Every keystroke
- Temporary wizard state
- UI interactions (hover, focus)

### Derived State
Never store calculated values in snapshots:
```typescript
// ❌ Bad - stale data when rules change
character.armorClass = 15

// ✅ Good - always current
const ac = createMemo(() => calculateAC(character()))
```

Calculate on demand: AC, HP, spell slots, proficiency bonus, saving throws, skill modifiers

### Performance
- Use `createMemo` for expensive calculations (>5ms)
- Batch updates with `batch()`
- Keep character data flat (avoid deep nesting)
- Profile before optimizing (use Chrome DevTools)

### Testing
- Unit test all `core/` functions (they're pure)
- Test edge cases: Level 1, Level 20, invalid transitions
- Test weird multiclass combos (Paladin 2/Warlock 3/Sorcerer 15)
- Test undo/redo sequences

## Accessibility Requirements

All interactive elements must be:
- **Keyboard navigable** (Tab, Enter, Space, Escape)
- **Properly labeled** (visible labels or aria-label)
- **Semantic HTML** (button, input, select - not div)

### Specific Patterns
- **Modals**: Trap focus, restore on close, `aria-modal="true"`
- **Forms**: Associate labels with inputs (`<label for="...">`)
- **Icon buttons**: `aria-label` for screen readers
- **Dynamic updates**: `aria-live` for changed stats (HP, level)

### Testing Checklist
- [ ] Keyboard only (unplug mouse)
- [ ] Screen reader (NVDA/VoiceOver)
- [ ] Focus indicators visible
- [ ] Tab order makes sense

**Good accessibility = good UX for everyone.** Power users want keyboard shortcuts.

## Key Pitfalls

1. **Don't over-abstract** - Build for D&D 5e specifically, not "any RPG"
2. **Multiclass spell slots** - NOT sum of caster levels (use multiclass table from SRD)
3. **Keep core/ pure** - No SolidJS imports in `app/core/`
4. **Validate before mutating** - Always validate, return Result type (don't throw)
5. **Data consistency** - Verify merged API data matches (run tests on public/data)

## Code Style

```typescript
// TypeScript: strict mode, discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Components: memoize calculations
export const CharacterSheet = (props: { id: string }) => {
  const [character] = useCharacter(props.id);
  const ac = createMemo(() => calculateAC(character()));
  return <div>{ac()}</div>;
}

// Naming conventions
levelUp()              // operations: verbs
validateLevelUp()      // validators: validate prefix
calculateAC()          // calculators: calculate prefix
```

## What Claude Helps With

**Focus on:**
- Architecture decisions (state flow, data structures)
- D&D rule implementation (validate against SRD)
- TypeScript patterns (prevent invalid states)
- Performance (SolidJS reactivity pitfalls)
- Accessibility (keyboard nav, screen readers)

**Challenge me on:**
- Over-engineering
- Adding dependencies unnecessarily
- Incorrect D&D rules
- Accessibility barriers
- Data structure decisions

**Don't:**
- Suggest backend solutions (out of scope)
- Recommend state libraries (SolidJS stores are enough)
- Sugar-coat bad ideas
- Let me skip accessibility

## Resources
- [D&D 5e SRD](https://dnd.wizards.com/resources/systems-reference-document)
- [SolidJS Docs](https://www.solidjs.com/)
- [dnd5eapi.co](https://www.dnd5eapi.co/)
- [open5e.com](https://open5e.com/)