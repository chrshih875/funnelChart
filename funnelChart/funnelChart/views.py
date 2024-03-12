from django.http import JsonResponse
import csv

def get_population_data(request):
    csv_file_path = 'raw_data.csv'

    population_data = []

    # Open the CSV file using the relative path
    with open(csv_file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Convert string values to float
            male_value = float(row['Male'])
            female_value = float(row['Female'])
            # Append data to population_data list
            population_data.append({
                'Male': male_value,
                'Female': female_value
            })
    
    # Create JsonResponse
    return JsonResponse(population_data, safe=False)
