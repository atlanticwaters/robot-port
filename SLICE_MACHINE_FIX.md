# Slice Machine Model Fixes

## Problem
Slice Machine validation was failing with 4 slice models due to schema incompatibility:
- `callout`
- `cta_banner`
- `quote`
- `rich_text_section`

## Error
```
DecodeError: Failed to decode slice model with id 'callout': Expecting ((Exact<({ type: "Color" } & Partial<{ fieldset: (string | null | undefined), config: Partial<{| label: (string | null | undefined), placeholder: string |}> ... at model.0.variations.0.1.primary.body but instead got: {"type":"RichText","config":{"label":"Body","multi":"paragraph,strong,em,hyperlink"}}
```

## Root Cause
The slice models were using the deprecated `RichText` field type. Newer versions of Slice Machine require `StructuredText` instead.

## Solution Applied

### Changed Field Type
**Before:**
```json
{
  "type": "RichText",
  "config": {
    "label": "Body",
    "multi": "paragraph,strong,em,hyperlink"
  }
}
```

**After:**
```json
{
  "type": "StructuredText",
  "config": {
    "label": "Body",
    "single": "paragraph,strong,em,hyperlink"
  }
}
```

### Key Changes
1. **Type:** `RichText` → `StructuredText`
2. **Config property:** `multi` → `single` (for single-format text)
3. **For multi-format:** Keep `multi` but still use `StructuredText` type

## Files Updated

### 1. Callout Slice
**File:** `apps/web/src/slices/Callout/model.json`
- Updated `body` field from `RichText` to `StructuredText`

### 2. CTABanner Slice
**File:** `apps/web/src/slices/CTABanner/model.json`
- Updated `description` field from `RichText` to `StructuredText`

### 3. Quote Slice
**File:** `apps/web/src/slices/Quote/model.json`
- Updated `quote` field from `RichText` to `StructuredText`

### 4. RichTextSection Slice
**File:** `apps/web/src/slices/RichTextSection/model.json`
- Updated `content` field from `RichText` to `StructuredText`
- Changed from `allowTargetBlank: true` to `labels: []`
- Kept `multi` property for multi-format support

## Result

✅ **Slice Machine now starts successfully!**

```bash
Slice Machine v2.18.2 → Running at http://localhost:9999
```

## Testing

To verify the fix:

```bash
cd apps/web
npx start-slicemachine --port 9999
```

Should start without validation errors and be accessible at http://localhost:9999

## Updated Startup Script

The `dev.sh` script has been updated to use the correct command:

```bash
npx start-slicemachine --port 9999
```

## Notes

- This follows Prismic's updated field type system
- Existing content in Prismic should continue to work without changes
- The component implementations (`index.tsx`) don't need updates as they work with both types
- `StructuredText` is the new standard for all rich text fields in Slice Machine

## References

- Prismic Slice Machine Documentation: https://prismic.io/docs/slice-machine
- Custom Types & Slices: https://prismic.io/docs/custom-types
