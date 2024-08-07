from django import template

register = template.Library()

@register.filter(name='length_greater_than')
def length_greater_than(value, length):
    return len(str(value)) > length