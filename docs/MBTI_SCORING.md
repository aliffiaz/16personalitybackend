# MBTI Scoring Methodology

This document details how MBTI scores are calculated in the Personality Test project. The scoring engine is deterministic and follows standard psychometric principles for the Myers-Briggs Type Indicator.

## 1. Test Structure
- **Total Questions**: 60
- **Scale**: 1 to 7 (Likert Scale)
  - 1: Strongly Disagree
  - 4: Neutral
  - 7: Strongly Agree

## 2. Dimensions and Poles
The test measures 4 key dimensions, each with two opposing poles:

| Dimension | Pole 1 (Tag) | Pole 2 (Tag) | Tiebreaker Winner |
|-----------|--------------|--------------|-------------------|
| **Mind** | Introversion (I) | Extraversion (E) | Introversion (I) |
| **Energy** | Intuition (N) | Sensing (S) | Intuition (N) |
| **Nature** | Thinking (T) | Feeling (F) | Feeling (F) |
| **Tactics** | Judging (J) | Perceiving (P) | Perceiving (P) |

## 3. Scoring Process

### Step A: Data Collection
Each of the 60 questions is tagged with a **Dimension** and a **Pole**. For example:
- Question 1: Mind (I)
- Question 5: Nature (T)

### Step B: Summation
The scores for each pole within a dimension are summed.
- $Score(Pole1) = \sum \text{scores of all questions tagged as Pole 1}$
- $Score(Pole2) = \sum \text{scores of all questions tagged as Pole 2}$

### Step C: Percentage Calculation
Percentages are calculated relative to the total score for that dimension:
- $TotalDimensionScore = Score(Pole1) + Score(Pole2)$
- $Pole1\% = \text{round}\left(\frac{Score(Pole1)}{TotalDimensionScore} \times 100\right)$
- $Pole2\% = 100 - Pole1\%$

### Step D: Determining the Dominant Pole
The pole with the higher percentage becomes the dominant trait for that dimension.
- If $Pole1\% > Pole2\%$, the trait is **Pole 1**.
- If $Pole2\% > Pole1\%$, the trait is **Pole 2**.
- **Tiebreaker**: If percentages are exactly 50/50, the designated "Tiebreaker Winner" is selected.

## 4. Final Type Generation
The dominant traits from each of the 4 dimensions are concatenated to form the 4-letter MBTI type (e.g., `I` + `N` + `F` + `P` = `INFP`).

## 5. Result Metadata
Once the type is determined, the system fetches detailed metadata from the internal database (`mbtiTypeData.js`), including:
- **Type Name** (e.g., "Mediator")
- **Category** (e.g., "Diplomats")
- **Strengths & Weaknesses**
- **Learning & Working Styles**
- **Career Mappings**
