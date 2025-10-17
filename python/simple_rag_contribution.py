#!/usr/bin/env python3
# Author: Rishabh
# Minimal Pinecone RAG Example - demonstrates retrieval-augmented generation workflow

"""
Simple RAG example using Pinecone for vector storage and retrieval.
This demonstrates the core RAG concept: retrieve relevant context, then generate an answer.

Requirements:
    pip install pinecone-client sentence-transformers

Setup:
    Set PINECONE_API_KEY environment variable with your Pinecone API key
"""

import os
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer

# Initialize embedding model
print("Loading embedding model...")
model = SentenceTransformer('all-MiniLM-L6-v2')

# Knowledge base - simple text snippets
KNOWLEDGE_BASE = {
    "python_basics": "Python is a high-level programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
    "python_data_types": "Python has several built-in data types including integers, floats, strings, lists, tuples, sets, and dictionaries. Each type has specific use cases and methods.",
    "python_loops": "Python supports for loops and while loops. For loops iterate over sequences like lists or ranges, while while loops continue until a condition becomes false.",
    "python_functions": "Functions in Python are defined using the 'def' keyword. They can accept parameters, return values, and support default arguments and keyword arguments.",
    "machine_learning": "Machine learning is a subset of AI that enables systems to learn from data without explicit programming. Common types include supervised, unsupervised, and reinforcement learning."
}

def initialize_pinecone():
    """Initialize Pinecone client and create/connect to index."""
    api_key = os.getenv('PINECONE_API_KEY')
    if not api_key:
        print("\nWARNING: PINECONE_API_KEY not set. Using demo mode (no actual Pinecone connection).")
        return None, None

    pc = Pinecone(api_key=api_key)
    index_name = "rag-demo"

    # Create index if it doesn't exist
    if index_name not in pc.list_indexes().names():
        print(f"Creating index '{index_name}'...")
        pc.create_index(
            name=index_name,
            dimension=384,  # all-MiniLM-L6-v2 produces 384-dim vectors
            metric='cosine',
            spec=ServerlessSpec(cloud='aws', region='us-east-1')
        )

    index = pc.Index(index_name)
    return pc, index

def upsert_knowledge_base(index):
    """Embed and upsert knowledge base to Pinecone."""
    if index is None:
        print("\nDemo mode: Skipping Pinecone upsert.")
        return

    print("\nEmbedding and upserting knowledge base to Pinecone...")
    vectors = []

    for doc_id, text in KNOWLEDGE_BASE.items():
        embedding = model.encode(text).tolist()
        vectors.append({
            "id": doc_id,
            "values": embedding,
            "metadata": {"text": text}
        })

    index.upsert(vectors=vectors)
    print(f"Upserted {len(vectors)} documents to Pinecone.")

def retrieve_relevant_snippet(query, index):
    """Retrieve the most relevant snippet from Pinecone."""
    if index is None:
        # Demo mode: simple keyword matching
        print("\nDemo mode: Using local keyword matching...")
        query_lower = query.lower()
        for doc_id, text in KNOWLEDGE_BASE.items():
            if any(word in text.lower() for word in query_lower.split()):
                return text
        return list(KNOWLEDGE_BASE.values())[0]  # Return first if no match

    # Embed the query
    query_embedding = model.encode(query).tolist()

    # Search Pinecone
    results = index.query(vector=query_embedding, top_k=1, include_metadata=True)

    if results['matches']:
        return results['matches'][0]['metadata']['text']
    return "No relevant information found."

def generate_answer(query, context):
    """
    Generate a simple answer based on retrieved context.
    In production, this would use an LLM like GPT-4, Claude, etc.
    """
    # Demo generation: simple template-based response
    answer = f"Based on the available information: {context}\n\nThis directly relates to your question about: {query}"
    return answer

def main():
    print("=== Minimal Pinecone RAG Example ===\n")

    # Initialize Pinecone
    pc, index = initialize_pinecone()

    # Upsert knowledge base
    if index:
        upsert_knowledge_base(index)

    # Interactive query loop
    print("\n--- Ready for queries ---")
    print("Type 'exit' to quit\n")

    while True:
        query = input("Enter your question: ").strip()

        if query.lower() == 'exit':
            print("Goodbye!")
            break

        if not query:
            continue

        # Retrieve relevant snippet
        print("\n[Retrieval Step]")
        relevant_snippet = retrieve_relevant_snippet(query, index)
        print(f"Retrieved snippet: {relevant_snippet[:100]}...")

        # Generate answer
        print("\n[Generation Step]")
        answer = generate_answer(query, relevant_snippet)
        print(f"Generated Answer:\n{answer}\n")
        print("-" * 60)

if __name__ == "__main__":
    main()
