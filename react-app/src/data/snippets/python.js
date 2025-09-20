export const pythonSnippets = [
  {
    title: "Python FastAPI REST Endpoint",
    language: "python",
    category: "python",
    code: `from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="User API", version="1.0.0")

# Pydantic models
class UserCreate(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None

    class Config:
        from_attributes = True

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome to User API"}

@app.get("/users", response_model=List[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in user.dict().items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
    tags: ["python", "fastapi", "rest", "api", "crud"]
  },
  {
    title: "Python Data Processing with Pandas",
    language: "python",
    category: "python",
    code: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Sample data processing pipeline
def process_sales_data(file_path: str) -> pd.DataFrame:
    """
    Process sales data with cleaning, transformation, and analysis
    """
    # Read data
    df = pd.read_csv(file_path)

    # Data cleaning
    df = df.dropna(subset=['customer_id', 'product_id', 'sale_amount'])
    df['sale_date'] = pd.to_datetime(df['sale_date'])
    df['sale_amount'] = pd.to_numeric(df['sale_amount'], errors='coerce')

    # Feature engineering
    df['year'] = df['sale_date'].dt.year
    df['month'] = df['sale_date'].dt.month
    df['quarter'] = df['sale_date'].dt.quarter
    df['day_of_week'] = df['sale_date'].dt.day_name()

    # Calculate metrics
    df['profit_margin'] = (df['sale_amount'] - df['cost']) / df['sale_amount']

    return df

def analyze_sales_trends(df: pd.DataFrame) -> dict:
    """
    Analyze sales trends and generate insights
    """
    analysis = {}

    # Monthly sales summary
    monthly_sales = df.groupby(['year', 'month']).agg({
        'sale_amount': ['sum', 'mean', 'count'],
        'profit_margin': 'mean'
    }).round(2)

    # Top products
    top_products = df.groupby('product_name')['sale_amount'].sum().sort_values(ascending=False).head(10)

    # Customer analysis
    customer_metrics = df.groupby('customer_id').agg({
        'sale_amount': ['sum', 'count'],
        'sale_date': ['min', 'max']
    })

    # Seasonal trends
    seasonal_trends = df.groupby('quarter')['sale_amount'].mean()

    analysis['monthly_sales'] = monthly_sales
    analysis['top_products'] = top_products
    analysis['customer_metrics'] = customer_metrics
    analysis['seasonal_trends'] = seasonal_trends

    return analysis

# Usage example
if __name__ == "__main__":
    # Process data
    sales_df = process_sales_data('sales_data.csv')

    # Generate insights
    insights = analyze_sales_trends(sales_df)

    # Export results
    sales_df.to_csv('processed_sales.csv', index=False)
    print("Data processing completed!")`,
    tags: ["python", "pandas", "data-analysis", "etl"]
  },
  {
    title: "Python Async/Await Pattern",
    language: "python",
    category: "python",
    code: `import asyncio
import aiohttp
import time
from typing import List, Dict, Any

async def fetch_url(session: aiohttp.ClientSession, url: str) -> Dict[str, Any]:
    """
    Fetch data from a single URL asynchronously
    """
    try:
        async with session.get(url) as response:
            data = await response.json()
            return {
                'url': url,
                'status': response.status,
                'data': data,
                'success': True
            }
    except Exception as e:
        return {
            'url': url,
            'status': None,
            'data': None,
            'error': str(e),
            'success': False
        }

async def fetch_multiple_urls(urls: List[str]) -> List[Dict[str, Any]]:
    """
    Fetch data from multiple URLs concurrently
    """
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

async def process_data_async(data_list: List[Dict]) -> List[Dict]:
    """
    Process data asynchronously with rate limiting
    """
    semaphore = asyncio.Semaphore(5)  # Limit concurrent operations

    async def process_item(item: Dict) -> Dict:
        async with semaphore:
            # Simulate async processing
            await asyncio.sleep(0.1)
            processed_item = {
                **item,
                'processed_at': time.time(),
                'processed': True
            }
            return processed_item

    tasks = [process_item(item) for item in data_list]
    results = await asyncio.gather(*tasks)
    return results

class AsyncDataProcessor:
    """
    Async data processor with connection pooling
    """

    def __init__(self, max_connections: int = 10):
        self.max_connections = max_connections
        self.session = None

    async def __aenter__(self):
        connector = aiohttp.TCPConnector(limit=self.max_connections)
        self.session = aiohttp.ClientSession(connector=connector)
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def batch_process(self, urls: List[str], batch_size: int = 5) -> List[Dict]:
        """
        Process URLs in batches to avoid overwhelming the server
        """
        results = []

        for i in range(0, len(urls), batch_size):
            batch = urls[i:i + batch_size]
            batch_tasks = [fetch_url(self.session, url) for url in batch]
            batch_results = await asyncio.gather(*batch_tasks)
            results.extend(batch_results)

            # Add delay between batches
            if i + batch_size < len(urls):
                await asyncio.sleep(1)

        return results

# Usage example
async def main():
    urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2'
    ]

    # Method 1: Simple concurrent fetching
    start_time = time.time()
    results = await fetch_multiple_urls(urls)
    print(f"Fetched {len(results)} URLs in {time.time() - start_time:.2f} seconds")

    # Method 2: Using context manager for advanced processing
    async with AsyncDataProcessor(max_connections=3) as processor:
        batch_results = await processor.batch_process(urls, batch_size=2)
        print(f"Batch processed {len(batch_results)} URLs")

if __name__ == "__main__":
    asyncio.run(main())`,
    tags: ["python", "async", "aiohttp", "concurrent", "asyncio"]
  }
];