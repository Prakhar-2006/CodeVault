# Minimal Pinecone RAG Example

A beginner-friendly Python example demonstrating Retrieval-Augmented Generation (RAG) using Pinecone vector database.

## What is RAG?

RAG (Retrieval-Augmented Generation) combines:
1. **Retrieval**: Finding relevant information from a knowledge base
2. **Generation**: Using that information to generate an answer

## Setup

### Install Dependencies

```bash
pip install pinecone-client sentence-transformers
```

### Set API Key (Optional)

```bash
# Linux/Mac
export PINECONE_API_KEY='your-api-key-here'

# Windows
set PINECONE_API_KEY=your-api-key-here
```

**Note**: The code works in demo mode without a Pinecone API key using local keyword matching.

## Usage

```bash
python simple_rag_contribution.py
```

## How It Works

1. **Knowledge Base**: Contains text snippets about Python programming
2. **Embedding**: Converts text to vectors using sentence-transformers
3. **Storage**: Stores vectors in Pinecone (or uses local demo mode)
4. **Query**: User asks a question
5. **Retrieval**: Finds most relevant snippet via similarity search
6. **Generation**: Creates answer based on retrieved context

## Example Session

```
=== Minimal Pinecone RAG Example ===

Loading embedding model...
Demo mode: Using local keyword matching...

--- Ready for queries ---
Type 'exit' to quit

Enter your question: What are Python data types?

[Retrieval Step]
Retrieved snippet: Python has several built-in data types including integers, floats, strings...

[Generation Step]
Generated Answer:
Based on the available information: Python has several built-in data types including integers, floats, strings, lists, tuples, sets, and dictionaries...
```

## Learning Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Sentence Transformers](https://www.sbert.net/)
- [RAG Explained](https://www.pinecone.io/learn/retrieval-augmented-generation/)

## Production Notes

In a production RAG system, you would:
- Use a larger embedding model for better accuracy
- Use an LLM (GPT-4, Claude, etc.) for answer generation
- Add more sophisticated retrieval strategies
- Implement proper error handling and logging
